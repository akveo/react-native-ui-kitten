/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import {
  FlatList,
  FlatListProps,
} from 'react-native';
import { LiteralUnion } from '../../devsupport';
import {
  useStyled,
} from '../../theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ListProps<ItemT = any> extends FlatListProps<ItemT> {
  appearance?: LiteralUnion<'default'>;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ListElement<ItemT = any> = React.ReactElement<ListProps<ItemT>>;

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

export interface ListRef {
  scrollToEnd: (params?: BaseScrollParams) => void;
  scrollToIndex: (params: ScrollToIndexParams) => void;
  scrollToOffset: (params: ScrollToOffsetParams) => void;
}

/**
 * Performant interface for rendering simple, flat lists.
 *
 * @extends React.FC
 *
 * @property {any[]} data - An array of anything to be rendered within the list
 *
 * @property {(ListRenderItemInfo<ItemT>) => ReactElement} renderItem - Takes an
 * item from *data* and renders it into the list.
 *
 * @property {FlatListProps} ...FlatListProps - Any props applied to FlatList component.
 *
 * @overview-example ListSimpleUsage
 * Lists should render ListItem components by providing them through `renderItem` property
 * to provide a useful component.
 *
 * @overview-example ListDividers
 * It is a good idea to separate items with `Divider` component.
 *
 * @overview-example ListAccessories
 * Items may contain inner views configured with `accessoryLeft` and `accessoryRight` properties.
 *
 * @overview-example ListCustomItem
 * Using ListItem is helpful for basic lists, but not required. For example, `Card` may be used.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ListComponent<ItemT = any>(
  { style, keyExtractor, appearance, ...flatListProps }: ListProps<ItemT>,
  ref: React.Ref<ListRef>
): React.ReactElement {
  const { style: evaStyle } = useStyled('List', { appearance });
  const listRef = useRef<FlatList>(null);

  useImperativeHandle(ref, () => ({
    scrollToEnd: (params?: BaseScrollParams) => {
      listRef.current?.scrollToEnd(params);
    },
    scrollToIndex: (params: ScrollToIndexParams) => {
      listRef.current?.scrollToIndex(params);
    },
    scrollToOffset: (params: ScrollToOffsetParams) => {
      listRef.current?.scrollToOffset(params);
    },
  }), []);

  const defaultKeyExtractor = useCallback((item: ItemT, index: number): string => {
    return index.toString();
  }, []);

  return (
    <FlatList
      keyExtractor={keyExtractor || defaultKeyExtractor}
      {...flatListProps}
      ref={listRef}
      style={[evaStyle, style]}
    />
  );
}

export const List = forwardRef(ListComponent) as <ItemT = any>(
  props: ListProps<ItemT> & { ref?: React.Ref<ListRef> }
) => React.ReactElement;
