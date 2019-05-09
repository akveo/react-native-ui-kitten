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
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { Props as ListItemProps } from './listItem.component';

// this is basically needed to avoid generics in required props
type ItemType = any;

interface ListProps<ItemT> {
  renderItem: (info: ListRenderItemInfo<ItemT>, style: StyleType) => React.ReactElement<any>;
}

export type Props = ListProps<ItemType> & StyledComponentProps & FlatListProps<ItemType>;

/**
 * The `List` component is a performant interface for rendering simple, flat lists. Extends FlatList. Renders list of
 * ListItem components or custom content.
 *
 * @extends React.Component
 *
 * @property {(info: ListRenderItemInfo<ItemT>, style: StyleType) => React.ReactElement<any>} renderItem - Takes an
 * item from data and renders it into the list. Returns ListRenderItemInfo and style.
 *
 * @property FlatListProps<ItemType>
 *
 * @property StyledComponentProps
 *
 * @example With ListItem Example
 *
 * ```
 * import {
 *   List,
 *   ListItem,
 *   CheckBox,
 *   CheckBoxProps,
 * } from '@kitten/ui';
 *
 * private renderItem = (info: ListRenderItemInfo<ListItemModel>): React.ReactElement<ListItemProps> => {
 *    const { item, index } = info;
 *    const Icon = (style: StyleType, index: number): React.ReactElement<ImageProps> => (
 *      <Image source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>
 *    );
 *
 *    const Accessory = (style: StyleType, index: number): React.ReactElement<CheckBoxProps> => (
 *      <CheckBox checked={index % 2 === 0}/>
 *    );
 *
 *    return (
 *      <ListItem
 *        title={`${item.title} ${index + 1}`}
 *        description={item.description}
 *        icon={Icon}
 *        accessory={Accessory}
 *        onPress={this.onItemPress}
 *      />
 *    );
 *  };
 *
 * public render(): React.ReactNode {
 *    return (
 *      <List
 *        data={this.items}
 *        renderItem={this.renderItem}
 *      />
 *    );
 *  }
 * ```
 *
 * @example With Custom List Item Example
 *
 * ```
 * import { List } from '@kitten/ui';
 *
 * private renderItem = (info: ListRenderItemInfo<ListItemModel>): React.ReactElement<ListItemProps> => {
 *
 *    return (
 *      <View style={styles.container}>
 *        <Image
 *          style={styles.icon}
 *          source={{ uri: 'https://akveo.github.io/eva-icons/outline/png/128/play-circle-outline.png' }}
 *        />
 *        <View style={styles.contentContainer}>
 *          <Text style={styles.title}>Welcome to the Jungle</Text>
 *          <Text style={styles.description}>Guns N'Roses</Text>
 *        </View>
 *        <Button style={styles.button} status='success'>$2.99</Button>
 *      </View>
 *    );
 *  };
 *
 * public render(): React.ReactNode {
 *    return (
 *      <List
 *        data={this.items}
 *        renderItem={this.renderItem}
 *      />
 *    );
 *  }
 * ```
 * */

export class List extends React.Component<Props> {

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
    const { item, ...container } = source;

    return {
      container: container,
    };
  };

  private getItemStyle = (source: StyleType, index: number): StyleType => {
    const { item } = source;

    return item;
  };

  private extractItemKey = (item: ItemType, index: number): string => {
    return index.toString();
  };

  private renderItem = (info: ListRenderItemInfo<ItemType>): React.ReactElement<ListItemProps> => {
    const { renderItem, themedStyle } = this.props;
    const { index } = info;

    const itemStyle: StyleType = this.getItemStyle(themedStyle, index);
    const itemElement: React.ReactElement<ListItemProps> = renderItem(info, itemStyle);

    return React.cloneElement(itemElement, {
      style: [itemStyle, itemElement.props.style, styles.item],
      index: index,
    });
  };

  public render(): React.ReactElement<FlatListProps<ItemType>> {
    const { style, themedStyle, ...derivedProps } = this.props;
    const { container } = this.getComponentStyle(themedStyle);

    return (
      <FlatList
        {...derivedProps}
        ref={this.listRef}
        style={[container, style, styles.container]}
        keyExtractor={this.extractItemKey}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  item: {},
});
