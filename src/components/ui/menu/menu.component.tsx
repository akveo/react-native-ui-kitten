/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import {
  ChildrenWithProps,
  IndexPath,
  Overwrite,
  LiteralUnion,
} from '../../devsupport';
import { styled } from '../../theme';
import { Divider } from '../divider/divider.component';
import {
  List,
  ListElement,
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

type MenuStyledProps = Overwrite<ListProps, {
  appearance?: LiteralUnion<'default' | 'noDivider'>;
}>;

type MenuListProps = Omit<MenuStyledProps, 'data' | 'renderItem'>;

export interface MenuProps extends MenuListProps {
  children?: ChildrenWithProps<MenuItemProps>;
  selectedIndex?: IndexPath;
  onSelect?: (index: IndexPath) => void;
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
@styled('Menu')
export class Menu extends React.Component<MenuProps> {

  private service: MenuService = new MenuService();

  private get data(): any[] {
    return React.Children.toArray(this.props.children || []);
  }

  private get shouldRenderDividers(): boolean {
    return this.props.appearance !== 'noDivider';
  }

  public clear = (): void => {
    this.props.onSelect && this.props.onSelect(null);
  };

  private onItemPress = (descriptor: MenuItemDescriptor): void => {
    this.props.onSelect && this.props.onSelect(descriptor.index);
  };

  private isItemSelected = (descriptor: MenuItemDescriptor): boolean => {
    return descriptor.index.equals(this.props.selectedIndex);
  };

  private cloneItemWithProps = (element: React.ReactElement, props: MenuItemProps): React.ReactElement => {
    const nestedElements = React.Children.map(element.props.children, (el: MenuItemElement, index: number) => {
      const descriptor = this.service.createDescriptorForNestedElement(props.descriptor, index);
      const selected: boolean = this.isItemSelected(descriptor);

      return this.cloneItemWithProps(el, { ...props, selected, descriptor });
    });

    const onPress = (event, descriptor) => {
      element.props.onPress && element.props.onPress();
      props.onPress(event, descriptor);
    };

    return React.cloneElement(element, { ...element.props, ...props, onPress }, nestedElements);
  };

  private renderItem = (info: ListRenderItemInfo<MenuItemElement>): React.ReactElement => {
    const descriptor = this.service.createDescriptorForElement(info.item, info.index);
    const selected: boolean = this.isItemSelected(descriptor);

    return this.cloneItemWithProps(info.item, { descriptor, selected, onPress: this.onItemPress });
  };

  public render(): ListElement {
    const { appearance, ...listProps } = this.props;

    return (
      <List
        ItemSeparatorComponent={this.shouldRenderDividers && Divider}
        {...listProps}
        data={this.data}
        renderItem={this.renderItem}
      />
    );
  }
}