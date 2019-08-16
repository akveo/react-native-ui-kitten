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
  MenuItemElement,
  MenuItemProps,
} from './menuItem.component';

interface ComponentProps {
  selectedIndex?: number;
  onSelect?: (index: number, event?: GestureResponderEvent) => void;
}

export type MenuProps = StyledComponentProps & ComponentProps & Omit<ListProps, 'renderItem'>;
export type MenuElement = React.ReactElement<MenuProps>;

class MenuComponent extends React.Component<MenuProps> {

  static styledComponentName: string = 'Menu';

  private onSelect = (index: number, event: GestureResponderEvent): void => {
    const { onSelect } = this.props;

    if (onSelect) {
      onSelect(index, event);
    }
  };

  private getComponentStyles = (style: StyleType): StyleType => {
    const { dividerHeight, dividerBackgroundColor } = style;

    return {
      height: dividerHeight,
      backgroundColor: dividerBackgroundColor,
    };
  };

  private renderMenuItem = (info: ListRenderItemInfo<MenuItemProps>): MenuItemElement => {
    const { selectedIndex } = this.props;
    const isSelected: boolean = info.index === selectedIndex;

    return (
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
