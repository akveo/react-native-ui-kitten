/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  ListRenderItemInfo,
  GestureResponderEvent,
} from 'react-native';
import {
  List,
  ListProps,
} from '../list/list.component';
import {
  DropdownItem,
  DropdownItemType,
  DropdownItemElement,
} from './droppdownItem.component';
import {
  DropdownGroup,
  DropdownGroupElement,
} from './dropdownGroup.component';
import { SelectionStrategy } from './selection.strategy';

type DefaultMenuItemElement = DropdownItemElement | DropdownGroupElement;
type MenuItemElement = DefaultMenuItemElement | React.ReactElement<any>;

export interface ComponentProps {
  data: DropdownItemType[];
  multiSelect?: boolean;
  strategy: SelectionStrategy;
  renderItem?: (item: ListRenderItemInfo<DropdownItemType>) => React.ReactElement<any>;
  onSelect: (option: DropdownItemType, event?: GestureResponderEvent) => void;
}

export type DropdownMenuProps = Partial<ListProps> & ComponentProps;
export type DropdownMenuElement = React.ReactElement<DropdownMenuProps>;

export class DropdownMenu extends React.Component<DropdownMenuProps> {

  private areThereSubItems = (dropdownItem: DropdownItemType): boolean => {
    const { items } = dropdownItem;

    return items && items.length !== 0;
  };

  private onSelect = (option: DropdownItemType, event?: GestureResponderEvent): void => {
    this.props.onSelect(option, event);
  };

  private renderDefaultItem = (info: ListRenderItemInfo<DropdownItemType>): DefaultMenuItemElement => {
    const { renderItem, multiSelect, strategy } = this.props;
    const selected: boolean = strategy.isSelected(info.item);

    return this.areThereSubItems(info.item) ? (
      <DropdownGroup
        {...info}
        strategy={strategy}
        multiSelect={multiSelect}
        renderItem={renderItem}
        onPress={this.onSelect}
      />
    ) : (
      <DropdownItem
        {...info}
        disabled={info.item.disabled}
        selected={selected}
        multiSelect={multiSelect}
        onPress={this.onSelect}
      />
    );
  };

  private renderItem = (info: ListRenderItemInfo<DropdownItemType>): MenuItemElement => {
    const { renderItem } = this.props;

    return renderItem ? renderItem(info) : this.renderDefaultItem(info);
  };

  public render(): DropdownMenuElement {
    const { style, ...restProps } = this.props;

    return (
      <List
        {...restProps}
        style={[styles.container, style]}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
