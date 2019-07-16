/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  TouchableOpacityProps,
  ListRenderItemInfo,
  GestureResponderEvent,
} from 'react-native';
import {
  List,
  ListProps,
} from '../list/list.component';
import {
  DropdownItem,
  DropdownItemProps,
} from './droppdownItem.component';

export type DropdownItemType = DropdownItemProps;
type DropdownItemElement = React.ReactElement<DropdownItemProps>;

export interface ComponentProps {
  items: DropdownItemType[];
  onSelect: (index: number, event?: GestureResponderEvent) => void;
}

export type DropdownMenuProps =  Partial<ListProps> & ComponentProps;

export class DropdownMenu extends React.Component<DropdownMenuProps> {

  private onSelect = (index: number, event?: GestureResponderEvent): void => {
    this.props.onSelect(index, event);
  };

  private renderItem = (info: ListRenderItemInfo<DropdownItemType>): DropdownItemElement => {
    return (
      <DropdownItem
        text={info.item.text}
        index={info.index}
        onPress={this.onSelect}
      />
    );
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { items, ...restProps } = this.props;

    return (
      <List
        {...restProps}
        data={items}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
