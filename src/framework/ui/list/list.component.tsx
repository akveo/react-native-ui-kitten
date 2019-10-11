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

export interface BaseScrollParams {
  animated?: boolean;
}

export interface ViewScrollParams {
  viewOffset?: number;
  viewPosition?: number;
}

export interface ScrollToIndexParams extends BaseScrollParams, ViewScrollParams {
  index: number;
}

export interface ScrollToOffsetParams extends BaseScrollParams {
  offset: number;
}

/**
 * `List` component is a performant interface for rendering simple, flat lists. Extends `FlatList`. Renders list of
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
 * @overview-example ListSimpleUsage
 *
 * @overview-example ListCompositeItem
 *
 * @example ListInlineStyling
 * ```
 */
export class ListComponent extends React.Component<ListProps> {

  static styledComponentName: string = 'List';

  private listRef: React.RefObject<FlatList<ItemType>> = React.createRef();

  public scrollToEnd = (params?: BaseScrollParams) => {
    this.listRef.current.scrollToEnd(params);
  };

  public scrollToIndex = (params: ScrollToIndexParams) => {
    this.listRef.current.scrollToIndex(params);
  };

  public scrollToOffset(params: ScrollToOffsetParams) {
    this.listRef.current.scrollToOffset(params);
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
