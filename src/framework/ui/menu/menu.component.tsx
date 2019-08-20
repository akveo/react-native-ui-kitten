/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ViewProps,
  ListRenderItemInfo,
  GestureResponderEvent,
  View,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  List,
  ListProps,
} from '../list/list.component';
import {
  MenuItem,
  MenuItemType,
  MenuItemElement,
  MenuItemProps,
} from './menuItem.component';
import { MenuGroup } from './menuGroup.component';

interface ComponentProps {
  selectedItem: MenuItemType;
  onSelect: (item: MenuItemType, event?: GestureResponderEvent) => void;
}

export type MenuProps = StyledComponentProps & ComponentProps & Omit<ListProps, 'renderItem'>;
export type MenuElement = React.ReactElement<MenuProps>;

class MenuComponent extends React.Component<MenuProps> {

  static styledComponentName: string = 'Menu';

  private onSelect = (selectedItem: MenuItemType, event: GestureResponderEvent): void => {
    const { onSelect } = this.props;

    if (onSelect) {
      onSelect(selectedItem, event);
    }
  };

  private getComponentStyles = (style: StyleType): StyleType => {
    const { dividerHeight, dividerBackgroundColor } = style;

    return {
      height: dividerHeight,
      backgroundColor: dividerBackgroundColor,
    };
  };

  private areThereSubItems = (item: MenuItemProps): boolean => {
    return item.subItems && item.subItems.length !== 0;
  };

  private getIsSelected = (item: MenuItemType): boolean => {
    const { selectedItem } = this.props;
    if (selectedItem) {
      return selectedItem.title === item.title;
    }
    return false;
  };

  private renderMenuItem = (info: ListRenderItemInfo<MenuItemProps>): MenuItemElement => {
    const { selectedItem, themedStyle } = this.props;
    const separatorStyle: StyleType = this.getComponentStyles(themedStyle);
    const isSelected: boolean = this.getIsSelected(info.item);

    return this.areThereSubItems(info.item) ? (
      <MenuGroup
        item={info.item}
        selectedItem={selectedItem}
        separatorStyle={separatorStyle}
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

  private renderSeparator = (): React.ReactElement<ViewProps> => {
    const { themedStyle } = this.props;
    const style: StyleType = this.getComponentStyles(themedStyle);

    return (
      <View style={style}/>
    );
  };

  public render(): React.ReactNode {
    const { appearance, ...restProps } = this.props;

    return (
      <List
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={this.renderMenuItem}
        {...restProps}
      />
    );
  }
}

export const Menu = styled<MenuProps>(MenuComponent);
