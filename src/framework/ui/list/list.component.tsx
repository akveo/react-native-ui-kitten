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

export class List extends React.Component<Props> {

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
