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
  SelectOption,
  SelectOptionType,
  SelectOptionElement,
} from './selectOption.component';
import {
  SelectGroupOption,
  SelectGroupOptionElement,
} from './selectGroupOption.component';
import { SelectOption as SelectOptionProp} from './select.component';
import { SelectionStrategy } from './selection.strategy';

type DefaultMenuItemElement = SelectOptionElement | SelectGroupOptionElement;
type MenuItemElement = DefaultMenuItemElement | React.ReactElement<any>;

export interface ComponentProps {
  data: SelectOptionType[];
  multiSelect?: boolean;
  strategy: SelectionStrategy<SelectOptionProp>;
  renderItem?: (item: ListRenderItemInfo<SelectOptionType>) => React.ReactElement<any>;
  onSelect: (option: SelectOptionType, event?: GestureResponderEvent) => void;
}

export type SelectOptionsListProps = Partial<ListProps> & ComponentProps;
export type SelectOptionsListElement = React.ReactElement<SelectOptionsListProps>;

export class SelectOptionsList extends React.Component<SelectOptionsListProps> {

  private areThereSubItems = (dropdownItem: SelectOptionType): boolean => {
    const { items } = dropdownItem;

    return items && items.length !== 0;
  };

  private onSelect = (option: SelectOptionType, event?: GestureResponderEvent): void => {
    this.props.onSelect(option, event);
  };

  private renderDefaultItem = (info: ListRenderItemInfo<SelectOptionType>): DefaultMenuItemElement => {
    const { renderItem, multiSelect, strategy } = this.props;
    const selected: boolean = strategy.isSelected(info.item);

    return this.areThereSubItems(info.item) ? (
      <SelectGroupOption
        {...info}
        strategy={strategy}
        multiSelect={multiSelect}
        renderItem={renderItem}
        onPress={this.onSelect}
      />
    ) : (
      <SelectOption
        {...info}
        disabled={info.item.disabled}
        selected={selected}
        multiSelect={multiSelect}
        onPress={this.onSelect}
      />
    );
  };

  private renderItem = (info: ListRenderItemInfo<SelectOptionType>): MenuItemElement => {
    const { renderItem } = this.props;

    return renderItem ? renderItem(info) : this.renderDefaultItem(info);
  };

  public render(): SelectOptionsListElement {
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
