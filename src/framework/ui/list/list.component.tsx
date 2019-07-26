/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { ListItemProps } from './listItem.component';

// this is basically needed to avoid generics in required props
type ItemType = any;
type ListItemElement = React.ReactElement<any>;
type RenderItemProp = (info: ListRenderItemInfo<ItemType>, style: StyleType) => ListItemElement;

interface ComponentProps {
  renderItem: RenderItemProp;
}

export type ListProps = StyledComponentProps & FlatListProps<ItemType> & ComponentProps;
export type ListElement = React.ReactElement<ListProps>;

/**
 * List component is a performant interface for rendering simple, flat lists. Extends `FlatList`. Renders list of
 * `ListItem` components or custom content.
 *
 * @extends React.Component
 *
 * @property {(info: ListRenderItemInfo<ItemT>, style: StyleType) => React.ReactElement<any>} renderItem - Takes an
 * item from data and renders it into the list.
 *
 * @property FlatListProps<ItemType>
 *
 * @property StyledComponentProps
 *
 * @example With ListItem example
 *
 * ```
 * import React from 'react';
 * import { ListRenderItemInfo } from 'react-native';
 * import {
 *   List,
 *   ListItem,
 * } from 'react-native-ui-kitten';
 *
 * export const ListShowcase = (props?: ListProps): React.ReactElement<ListProps> => {
 *
 *   private data: string[] = [
 *     'Item 1',
 *     'Item 2',
 *     'Item 3',
 *   ];
 *
 *   private onItemPress = (index: number) => {
 *     // Handle item press
 *   };
 *
 *   private renderItem = (info: ListRenderItemInfo<ListItemModel>): React.ReactElement<ListItemProps> => {
 *     return (
 *       <ListItem
 *         title={`${info.item}`}
 *         description='Description'
 *         onPress={onItemPress}
 *       />
 *     );
 *   };
 *
 *   return (
 *     <List
 *       data={data}
 *       renderItem={renderItem}
 *     />
 *   );
 * };
 * ```
 *
 * @example With Custom ListItem example
 *
 * ```
 * import React from 'react';
 * import { ListRenderItemInfo } from 'react-native';
 * import {
 *   List,
 *   ListItem,
 * } from 'react-native-ui-kitten';
 * import { CustomListItemView } from './path-to/custom-list-item-view';
 *
 * export const ListShowcase = (props?: ListProps): React.ReactElement<ListProps> => {
 *
 *   const data: string[] = [
 *      ...
 *   ];
 *
 *   const onItemPress = (index: number) => {
 *     // Handle List Item press
 *   };
 *
 *   const renderItem = (info: ListRenderItemInfo<ListItemModel>): React.ReactElement<ListItemProps> => {
 *     return (
 *       <ListItem onPress={onItemPress}>
 *         <CustomListItem/>
 *       </ListItem>
 *     );
 *   };
 *
 *   return (
 *     <List
 *       data={data}
 *       renderItem={renderItem}
 *     />
 *   );
 * };
 * ```
 * */

class ListComponent extends React.Component<ListProps> {

  static styledComponentName: string = 'List';

  private listRef: React.RefObject<FlatList<ItemType>> = React.createRef();

  public scrollToEnd = (params?: { animated?: boolean }) => {
    const { current: list } = this.listRef;

    list.scrollToEnd(params);
  };

  public scrollToIndex = (params: {
    animated?: boolean;
    index: number;
    viewOffset?: number;
    viewPosition?: number
  }) => {

    const { current: list } = this.listRef;

    list.scrollToIndex(params);
  };

  public scrollToOffset(params: { animated?: boolean; offset: number }) {
    const { current: list } = this.listRef;

    list.scrollToOffset(params);
  }

  private getComponentStyle = (source: StyleType): StyleType => {
    return {
      container: source,
      item: {},
    };
  };

  private getItemStyle = (source: StyleType, index: number): ViewStyle => {
    const { item } = source;

    return item;
  };

  private keyExtractor = (item: ItemType, index: number): string => {
    return index.toString();
  };

  private renderItem = (info: ListRenderItemInfo<ItemType>): ListItemElement => {
    const itemStyle: StyleType = this.getItemStyle(this.props.themedStyle, info.index);
    const itemElement: React.ReactElement<ListItemProps> = this.props.renderItem(info, itemStyle);

    return React.cloneElement(itemElement, {
      style: [itemStyle, styles.item, itemElement.props.style],
      index: info.index,
    });
  };

  public render(): React.ReactElement<FlatListProps<ItemType>> {
    const { style, themedStyle, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <FlatList
        {...derivedProps}
        ref={this.listRef}
        style={[componentStyle.container, styles.container, style]}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  item: {},
});

export const List = styled<ListProps>(ListComponent);
