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
  DropdownItemType,
} from './droppdownItem.component';
import { DropdownGroup } from './dropdownGroup.component';
import { SelectionStrategy } from './selection.strategy';

type DropdownItemElement = React.ReactElement<DropdownItemProps>;

export interface ComponentProps {
  items: DropdownItemType[];
  size?: string;
  multiSelect?: boolean;
  strategy: SelectionStrategy;
  renderItem?: (item: ListRenderItemInfo<DropdownItemType>) => React.ReactElement<any>;
  onSelect: (option: DropdownItemType, event?: GestureResponderEvent) => void;
}

export type DropdownMenuProps = Partial<ListProps> & ComponentProps;

export class DropdownMenu extends React.Component<DropdownMenuProps> {

  private areThereSubItems = (dropdownItem: DropdownItemType): boolean => {
    const { items } = dropdownItem;

    return items && items.length !== 0;
  };

  private onSelect = (option: DropdownItemType, event?: GestureResponderEvent): void => {
    this.props.onSelect(option, event);
  };

  private renderDefaultItem = (info: ListRenderItemInfo<DropdownItemType>): DropdownItemElement => {
    const { size, renderItem, multiSelect, strategy } = this.props;
    const selected: boolean = strategy.isSelected(info.item);

    return this.areThereSubItems(info.item) ? (
      <DropdownGroup
        {...info}
        strategy={strategy}
        size={size}
        multiSelect={multiSelect}
        renderItem={renderItem}
        onPress={this.onSelect}
      />
    ) : (
      <DropdownItem
        {...info}
        selected={selected}
        size={size}
        multiSelect={multiSelect}
        onPress={this.onSelect}
      />
    );
  };

  private renderItem = (info: ListRenderItemInfo<DropdownItemType>): React.ReactElement<any> => {
    const { renderItem } = this.props;

    return renderItem ? renderItem(info) : this.renderDefaultItem(info);
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { items, style, ...restProps } = this.props;

    return (
      <List
        {...restProps}
        style={[styles.container, style]}
        data={items}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
