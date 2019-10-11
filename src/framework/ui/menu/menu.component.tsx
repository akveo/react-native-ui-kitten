/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ListRenderItemInfo,
  GestureResponderEvent,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
} from '@kitten/theme';
import {
  List,
  ListProps,
} from '../list/list.component';
import {
  Divider,
  DividerElement,
} from '../divider/divider.component';
import {
  MenuItem,
  MenuItemType,
  MenuItemElement,
  MenuItemProps,
} from './menuItem.component';
import { SubMenu } from './subMenu.component';
import { MenuService } from './menu.service';

interface ComponentProps {
  selectedIndex?: number;
  onSelect: (index: number, event?: GestureResponderEvent) => void;
}

export type MenuProps = StyledComponentProps & ComponentProps & Omit<ListProps, 'renderItem'>;
export type MenuElement = React.ReactElement<MenuProps>;

/**
 * `Menu` renders vertical list of `MenuItems`.
 *
 * @extends React.Component
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be `default` or `noDivider`.
 * Default is `default`.
 *
 * @property {MenuItemType[]} data - Determines menu items.
 *
 * @property {number} selectedIndex - The index of selected item.
 *
 * @property {(index: number, event?: GestureResponderEvent) => void} onSelect - Fires when
 * selected item is changed.
 *
 * @property Omit<ListProps, 'renderItem'>
 *
 * @property StyledComponentProps
 *
 * @overview-example MenuSimpleUsage
 *
 * @overview-example MenuAppearance
 *
 * @overview-example MenuWithSubMenu
 *
 * @example MenuWithIcons
 *
 * @example MenuInlineStyling
 */
class MenuComponent extends React.Component<MenuProps> {

  static styledComponentName: string = 'Menu';

  private service: MenuService = new MenuService();

  private onSelect = (selectedIndex: number, event: GestureResponderEvent): void => {
    const { onSelect } = this.props;

    if (onSelect) {
      onSelect(selectedIndex, event);
    }
  };

  private isDividerAbsent = (): boolean => {
    const { appearance } = this.props;

    return appearance !== 'noDivider';
  };

  private areThereSubItems = (item: MenuItemProps): boolean => {
    return item.subItems && item.subItems.length !== 0;
  };

  private getIsSelected = (item: MenuItemType): boolean => {
    const { selectedIndex } = this.props;

    return selectedIndex === item.menuIndex;
  };

  private renderMenuItem = (info: ListRenderItemInfo<MenuItemProps>): MenuItemElement => {
    const { selectedIndex } = this.props;
    const isSelected: boolean = this.getIsSelected(info.item);

    return this.areThereSubItems(info.item) ? (
      <SubMenu
        item={info.item}
        selectedIndex={selectedIndex}
        divider={this.renderDivider()}
        onSelect={this.onSelect}
      />
    ) : (
      <MenuItem
        {...info.item}
        selected={isSelected}
        onPress={this.onSelect}
      />
    );
  };

  private renderDivider = (): DividerElement => {
    return this.isDividerAbsent() && (
      <Divider/>
    );
  };

  public render(): React.ReactNode {
    const { appearance, data, ...restProps } = this.props;
    const items: MenuItemType[] = this.service.setIndexes(data);

    return (
      <List
        ItemSeparatorComponent={this.renderDivider}
        renderItem={this.renderMenuItem}
        data={items}
        {...restProps}
      />
    );
  }
}

export const Menu = styled<MenuProps>(MenuComponent);
