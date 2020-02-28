/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Overwrite } from 'utility-types';
import { ChildrenWithProps } from '../../devsupport';
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

type MenuStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | 'noDivider' | string;
}>;

type MenuListProps = Omit<ListProps, 'data' | 'renderItem'>;

export interface MenuProps extends MenuListProps, MenuStyledProps {
  children?: ChildrenWithProps<MenuItemProps>;
}

export type MenuElement = React.ReactElement<MenuProps>;

/**
 * Styled `Menu` component.
 * Renders UI Kitten List component with additional styles provided by Eva.
 *
 * @extends React.Component
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be `default` or `noDivider`.
 * Default is `default`.
 *
 * @property {ReactElement<MenuItemProps> | ReactElement<MenuItemProps>[]} children - Determines items of the Menu.
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

  private get data(): any[] {
    return React.Children.toArray(this.props.children || []);
  }

  private get shouldRenderDividers(): boolean {
    return this.props.appearance !== 'noDivider';
  }

  private renderItem = (info: ListRenderItemInfo<MenuItemElement>): MenuItemElement => {
    return info.item;
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
