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
import { ListItemProps } from './listItem.component';

// this is basically needed to avoid generics in required props
type ItemType = any;
type ListItemElement = React.ReactElement<any>;
type RenderItemProp = (info: ListRenderItemInfo<ItemType>, style: StyleType) => ListItemElement;

interface ComponentProps {
  renderItem: RenderItemProp;
}

export type ListProps = StyledComponentProps & FlatListProps<ItemType> & ComponentProps;

export class List extends React.Component<ListProps> {

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
    const { style } = this.props;

    return {
      ...source,
      ...styles.container,
      ...StyleSheet.flatten(style),
    };
  };

  private getItemStyle = (source: StyleType, index: number): StyleType => {
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
        style={componentStyle}
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
