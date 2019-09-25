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
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import { Menu } from 'react-native-ui-kitten';
 *
 * export class MenuShowcase extends React.Component {
 *
 *   state = {
 *     selectedIndex: null,
 *   };
 *
 *   data = [
 *     { title: 'Item 1' },
 *     { title: 'Item 2' },
 *     { title: 'Item 3' },
 *   ];
 *
 *   onSelect = (selectedIndex) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   render() {
 *     return (
 *       <Menu
 *         data={this.data}
 *         selectedItem={this.state.selectedIndex}
 *         onSelect={this.onItemSelect}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @overview-example Sub Menus
 *
 * ```
 * import React from 'react';
 * import { Menu } from 'react-native-ui-kitten';
 *
 * export class MenuShowcase extends React.Component {
 *
 *   state = {
 *     selectedIndex: null,
 *   };
 *
 *   data = [
 *     { title: 'Item 1' },
 *     {
 *       title: 'Item 2',
 *       subItems: [
 *         { title: 'Item 21' },
 *         { title: 'Item 22' },
 *         { title: 'Item 23' },
 *       ],
 *     },
 *     { title: 'Item 3' },
 *   ];
 *
 *   onSelect = (selectedIndex) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   render() {
 *     return (
 *       <Menu
 *         data={this.data}
 *         selectedItem={this.state.selectedIndex}
 *         onSelect={this.onItemSelect}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @overview-example With Icons
 *
 * ```
 * // IMPORTANT: To use Icon component make sure to follow this guide:
 * // https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons
 *
 * import React from 'react';
 * import { Menu, Icon } from 'react-native-ui-kitten';
 *
 * const StarIcon = (style) => (
 *   <Icon {...style} name='star' />
 * );
 *
 * export class MenuShowcase extends React.Component {
 *
 *   state = {
 *     selectedIndex: null,
 *   };
 *
 *   data = [
 *     { title: 'Item 1', icon: StarIcon },
 *     { title: 'Item 2', icon: StarIcon },
 *     { title: 'Item 3', icon: StarIcon },
 *   ];
 *
 *   onSelect = (selectedIndex) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   render() {
 *     return (
 *       <Menu
 *         data={this.data}
 *         selectedItem={this.state.selectedIndex}
 *         onSelect={this.onItemSelect}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @overview-example Eva Styling
 *
 * ```
 * import React from 'react';
 * import { Menu } from 'react-native-ui-kitten';
 *
 * export class MenuShowcase extends React.Component {
 *
 *   state = {
 *     selectedIndex: null,
 *   };
 *
 *   data = [
 *     { title: 'Item 1' },
 *     { title: 'Item 2' },
 *     { title: 'Item 3' },
 *   ];
 *
 *   onSelect = (selectedIndex) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   render() {
 *     return (
 *       <Menu
 *         appearance='noDivider'
 *         data={this.data}
 *         selectedIndex={this.state.selectedIndex}
 *         onSelect={this.onItemSelect}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @example Disabled Item
 *
 * ```
 * import React from 'react';
 * import { Menu } from 'react-native-ui-kitten';
 *
 * export class MenuShowcase extends React.Component {
 *
 *   state = {
 *     selectedIndex: null,
 *   };
 *
 *   data = [
 *     { title: 'Item 1', disabled: true },
 *     { title: 'Item 2' },
 *     { title: 'Item 3' },
 *   ];
 *
 *   onSelect = (selectedIndex) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   render() {
 *     return (
 *       <Menu
 *         data={this.data}
 *         selectedItem={this.state.selectedIndex}
 *         onSelect={this.onItemSelect}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @example Using Asset Icons
 *
 * ```
 * import React from 'react';
 * import { Image } from 'react-native';
 * import { Menu } from 'react-native-ui-kitten';
 *
 * const StarIcon = (style) => (
 *   <Image style={style} source={require('path-to-assets/local-image.png')} />
 * );
 *
 * export class MenuShowcase extends React.Component {
 *
 *   state = {
 *     selectedIndex: null,
 *   };
 *
 *   data = [
 *     { title: 'Item 1', icon: StarIcon },
 *     { title: 'Item 2', icon: StarIcon },
 *     { title: 'Item 3', icon: StarIcon },
 *   ];
 *
 *   onSelect = (selectedIndex) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   render() {
 *     return (
 *       <Menu
 *         data={this.data}
 *         selectedItem={this.state.selectedIndex}
 *         onSelect={this.onItemSelect}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @example Inline Styling
 *
 * ```
 * import React from 'react';
 * import { StyleSheet } from 'react-native';
 * import { Menu } from 'react-native-ui-kitten';
 *
 * export class MenuShowcase extends React.Component {
 *
 *   state = {
 *     selectedIndex: null,
 *   };
 *
 *   data = [
 *     { title: 'Item 1', titleStyle: styles.menuItemTitle },
 *     { title: 'Item 2', titleStyle: styles.menuItemTitle },
 *     { title: 'Item 3', titleStyle: styles.menuItemTitle },
 *   ];
 *
 *   onSelect = (selectedIndex) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   render() {
 *     return (
 *       <Menu
 *         data={this.data}
 *         selectedItem={this.state.selectedIndex}
 *         onSelect={this.onItemSelect}
 *       />
 *     );
 *   }
 * }
 *
 * const styles = StyleSheet.create({
 *   menuItemTitle: { color: 'black', fontSize: 18 },
 * });
 * ```
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
