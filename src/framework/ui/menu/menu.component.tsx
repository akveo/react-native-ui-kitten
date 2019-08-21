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
 * Can be `default` or `divider`.
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
 * import {
 *   Menu,
 *   MenuItemType,
 * } from 'react-native-ui-kitten';
 *
 * interface State {
 *   selectedIndex: number;
 * }
 *
 * export class MenuShowcase extends React.Component<any, State> {
 *
 *   public state: State = {
 *     selectedIndex: null,
 *   };
 *
 *   private data: MenuItemType[] = [
 *     { title: 'Item 1' },
 *     { title: 'Item 2' },
 *     { title: 'Item 3' },
 *   ];
 *
 *   private onSelect = (selectedIndex: number): void => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <Menu
 *         data={this.items}
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
 * // use code from the example above
 *
 * <Menu
 *   appearance='divider'
 *   data={this.items}
 *   selectedItem={this.state.selectedIndex}
 *   onSelect={this.onItemSelect}
 * />
 * ```
 *
 * @example Disabled Item
 *
 * ```
 * // use code from example above
 *
 * private data: MenuItemType[] = [
 *   { title: 'Item 1', disabled: true },
 *   { title: 'Item 2' },
 *   { title: 'Item 3' },
 * ];
 * ```
 *
 * @example With Icons
 *
 * ```
 * // use code from example above
 *
 * Icon = (style: StyleType): React.ReactElement<ImageProps> => (
 *   <Image
 *     style={style}
 *     source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
 *   />
 * );
 *
 * private data: MenuItemType[] = [
 *   {
 *     title: 'Item 1',
 *     icon: this.Icon,
 *   },
 *   {
 *     title: 'Item 2',
 *     icon: this.Icon,
 *   },
 *   {
 *     title: 'Item 3',
 *     icon: this.Icon,
 *   },
 * ];
 * ```
 *
 * @example With Items Groups
 *
 * ```
 * // use code from example above
 *
 * private data: MenuItemType[] = [
 *   { title: 'Item 1' },
 *   {
 *     title: 'Item 2',
 *     subItems: [
 *       { title: 'Item 21' },
 *       { title: 'Item 22' },
 *       { title: 'Item 23' },
 *     ],
 *   },
 *   { title: 'Item 3' },
 * ];
 * ```
 *
 * @example Inline Styling
 *
 * ```
 * // use code from example above
 *
 * private data: MenuItemType[] = [
 *   { title: 'Item 1', titleStyle: { color: 'red', fontSize: 18 } },
 *   { title: 'Item 2' },
 *   { title: 'Item 3' },
 * ];
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
    const { selectedIndex } = this.props;

    return selectedIndex === item.menuIndex;
  };

  private renderMenuItem = (info: ListRenderItemInfo<MenuItemProps>): MenuItemElement => {
    const { selectedIndex, themedStyle } = this.props;
    const separatorStyle: StyleType = this.getComponentStyles(themedStyle);
    const isSelected: boolean = this.getIsSelected(info.item);

    return this.areThereSubItems(info.item) ? (
      <MenuGroup
        item={info.item}
        selectedIndex={selectedIndex}
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
    const { appearance, data, ...restProps } = this.props;
    const items: MenuItemType[] = this.service.setIndexes(data);

    return (
      <List
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={this.renderMenuItem}
        data={items}
        {...restProps}
      />
    );
  }
}

export const Menu = styled<MenuProps>(MenuComponent);
