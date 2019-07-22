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

type DropdownItemElement = React.ReactElement<DropdownItemProps>;

interface SelectedType {
  selected: boolean;
  index?: number;
}

export interface ComponentProps {
  items: DropdownItemType[];
  selectedOption?: DropdownItemType;
  size?: string;
  onSelect: (option: DropdownItemType, event?: GestureResponderEvent) => void;
}

export type DropdownMenuProps = Partial<ListProps> & ComponentProps;

export class DropdownMenu extends React.Component<DropdownMenuProps> {

  private areThereSubItems = (dropdownItem: DropdownItemType): boolean => {
    const { items } = dropdownItem;

    return items && items.length !== 0;
  };

  private isOptionSelected = (item: DropdownItemType): SelectedType => {
    const { selectedOption } = this.props;

    if (this.areThereSubItems(item)) {
      let selectedIndex: number;
      const selected: boolean = item.items.some((option: DropdownItemType, index: number) => {
        if (this.areThereSubItems(option)) {
          return this.isOptionSelected(option);
        } else {
          selectedIndex = index;
          return option === selectedOption;
        }
      });
      return { selected: selected, index: selectedIndex };
    }
    return { selected: selectedOption === item };
  };

  private onSelect = (option: DropdownItemType, event?: GestureResponderEvent): void => {
    this.props.onSelect(option, event);
  };

  private renderItem = (info: ListRenderItemInfo<DropdownItemType>): DropdownItemElement => {
    const { size } = this.props;
    const selected: SelectedType = this.isOptionSelected(info.item);
    const groupSelectedIndex: number | null = selected.selected ? selected.index : null;

    return this.areThereSubItems(info.item) ? (
      <DropdownGroup
        {...info}
        {...info.item}
        size={size}
        selectedIndex={groupSelectedIndex}
        onPress={this.onSelect}
      />
    ) : (
      <DropdownItem
        {...info}
        {...info.item}
        size={size}
        selected={selected.selected}
        onPress={this.onSelect}
      />
    );
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { items, style, selectedOption, ...restProps } = this.props;

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
