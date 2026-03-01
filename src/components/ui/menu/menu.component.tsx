/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useMemo, useRef } from 'react';
import { GestureResponderEvent, ListRenderItemInfo } from 'react-native';
import {
  ChildrenWithProps,
  IndexPath,
  LiteralUnion,
} from '../../devsupport';
import { useStyled } from '../../theme';
import { Divider } from '../divider/divider.component';
import {
  List,
  ListProps,
} from '../list/list.component';
import {
  MenuItemElement,
  MenuItemProps,
} from './menuItem.component';
import {
  MenuItemDescriptor,
  MenuService,
} from './menu.service';

type MenuListProps = Omit<ListProps, 'data' | 'renderItem'>;

export interface MenuProps extends MenuListProps {
  children?: ChildrenWithProps<MenuItemProps>;
  selectedIndex?: IndexPath;
  onSelect?: (index: IndexPath) => void;
  appearance?: LiteralUnion<'default' | 'noDivider'>;
}

export type MenuElement = React.ReactElement<MenuProps>;

/**
 * A versatile menu for navigation.
 * Menu should contain MenuItem or MenuGroup components to provide a useful component.
 *
 * @extends React.Component
 *
 * @property {string} appearance - Appearance of the component.
 * Can be `default` or `noDivider`.
 *
 * @property {ReactElement<MenuItemProps> | ReactElement<MenuItemProps>[]} children -
 * Items to be rendered within menu.
 *
 * @property {IndexPath} selectedIndex - Index of selected item.
 * IndexPath `row: number, section?: number` - position of element in sectioned list.
 * Menu becomes sectioned when MenuGroup is rendered within children.
 * Updating this property is not required if marking items selected is not needed.
 *
 * @property {(IndexPath) => void} onSelect - Called when item is pressed.
 * Called with `row: number` for non-grouped items.
 * Called with `row: number, section: number` for items rendered within group,
 * where row - index of item in group, section - index of group in list.
 *
 * @property {ListProps} ...ListProps - Any props applied to List component,
 * excluding `renderItem` and `data`.
 *
 * @overview-example MenuSimpleUsage
 *
 * @overview-example MenuIndexType
 * Menu works with special index object - IndexPath.
 * For non-grouped items in menu, there is only a `row` property.
 * Otherwise, `row` is an index of option within the group, section - index of group in menu.
 * ```
 * interface IndexPath {
 *   row: number;
 *   section?: number;
 * }
 * ```
 *
 * @overview-example MenuNoMarkers
 * Pressing of menu items can be handled without marking items.
 *
 * @overview-example MenuAccessories
 * Items may contain inner views configured with `accessoryLeft` and `accessoryRight` properties.
 * Within Eva, item accessories are expected to be images or [svg icons](guides/icon-packages).
 *
 * @overview-example MenuGroups
 * And be grouped within `MenuGroup` component.
 *
 * @overview-example MenuDisabledOptions
 * Also, it may be disabled with `disabled` property.
 *
 * @overview-example MenuStyling
 * Menu and it's inner views can be styled by passing them as function components.
 * ```
 * import { MenuItem, Text } from '@ui-kitten/components';
 *
 * <MenuItem
 *   title={evaProps => <Text {...evaProps}>USERS</Text>}>
 * </MenuItem>
 * ```
 *
 * @overview-example MenuTheming
 * In most cases this is redundant, if [custom theme is configured](guides/branding).
 *
 */
export interface MenuRef {
  clear: () => void;
}

export const Menu: React.FC<MenuProps> = ({
  children,
  selectedIndex,
  onSelect,
  appearance,
  ...listProps
}) => {
  useStyled('Menu', { appearance });
  const serviceRef = useRef<MenuService>(new MenuService());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] = useMemo(() => {
    return React.Children.toArray(children || []);
  }, [children]);

  const shouldRenderDividers = appearance !== 'noDivider';

  const onItemPress = useCallback((descriptor: MenuItemDescriptor): void => {
    onSelect?.(descriptor.index);
  }, [onSelect]);

  const isItemSelected = useCallback((descriptor: MenuItemDescriptor): boolean => {
    return descriptor.index.equals(selectedIndex);
  }, [selectedIndex]);

  const cloneItemWithProps = useCallback((element: React.ReactElement<MenuItemProps>, props: MenuItemProps): React.ReactElement => {
    const nestedElements = React.Children.map(element.props.children, (el: MenuItemElement, index: number) => {
      const descriptor = serviceRef.current.createDescriptorForNestedElement(props.descriptor, index);
      const selected: boolean = isItemSelected(descriptor);

      return cloneItemWithProps(el, { ...props, selected, descriptor });
    });

    const onPress = (descriptor: MenuItemDescriptor, event?: GestureResponderEvent): void => {
      element.props.onPress?.(descriptor, event);
      props.onPress(descriptor);
    };

    return React.cloneElement(element, { ...element.props, ...props, onPress }, nestedElements);
  }, [isItemSelected]);

  const renderItem = useCallback((info: ListRenderItemInfo<MenuItemElement>): React.ReactElement => {
    const descriptor = serviceRef.current.createDescriptorForElement(info.item, info.index);
    const selected: boolean = isItemSelected(descriptor);

    return cloneItemWithProps(info.item, { descriptor, selected, onPress: onItemPress });
  }, [cloneItemWithProps, isItemSelected, onItemPress]);

  return (
    <List
      ItemSeparatorComponent={shouldRenderDividers && Divider}
      {...listProps}
      data={data}
      renderItem={renderItem}
    />
  );
};

Menu.displayName = 'Menu';
