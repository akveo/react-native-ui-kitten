/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Overwrite } from 'utility-types';
import {
  ChildrenWithProps,
  IndexPath,
} from '../../devsupport';
import {
  styled,
  StyledComponentProps,
} from '../../theme';
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

type MenuStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | 'noDivider' | string;
}>;

type MenuListProps = Omit<ListProps, 'data' | 'renderItem'>;

export interface MenuProps extends MenuListProps, MenuStyledProps {
  children?: ChildrenWithProps<MenuItemProps>;
  selectedIndex?: IndexPath;
  onSelect?: (index: IndexPath) => void;
}

export type MenuElement = React.ReactElement<MenuProps>;

/**
 * Styled `Menu` component.
 * Renders UI Kitten List component with additional styles provided by Eva.
 *
 * @extends React.Component
 *
 * @property {string} appearance - appearance of the component.
 * Can be `default` or `noDivider`.
 *
 * @property {ReactElement<MenuItemProps> | ReactElement<MenuItemProps>[]} children -
 * items to be rendered within menu.
 *
 * @property {IndexPath} selectedIndex - index of selected item.
 * IndexPath `{ row: number, section: number | undefined }` - position of element in sectioned list.
 * Menu becomes sectioned when MenuGroup is rendered within children.
 * Updating this property is not required if marking items selected is not needed.
 *
 * @property {(option: IndexPath | IndexPath[]) => void} onSelect - called when item is pressed.
 * Called with `{ row: number }` by default.
 * Called with { row: number, section: number } for items rendered within SelectGroup.
 *
 * @property {ListProps} ...ListProps - Any props applied to List component,
 * excluding `renderItem` and `data`.
 *
 * @overview-example MenuSimpleUsage
 *
 * @overview-example MenuWithSubMenu
 *
 * @overview-example MenuWithIcons
 *
 * @overview-example MenuDisabledOptions
 *
 * @overview-example MenuWithoutDivider
 *
 * @example MenuInlineStyling
 */
class MenuComponent extends React.Component<MenuProps> {

  static styledComponentName: string = 'Menu';

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
      const descriptor = this.service.createDescriptorForNestedElement(el, props.descriptor, index);
      const selected: boolean = this.isItemSelected(descriptor);

      return this.cloneItemWithProps(el, { ...props, selected, descriptor });
    });

    return React.cloneElement(element, { ...props, ...element.props }, nestedElements);
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

export const Menu = styled<MenuProps>(MenuComponent);
