/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  ListRenderItemInfo,
} from 'react-native';
import {
  List,
  ListProps,
} from '../list/list.component';
import {
  SelectOption,
  SelectOptionElement,
  SelectOptionType,
} from './selectOption.component';
import {
  SelectGroupOption,
  SelectGroupOptionElement,
} from './selectGroupOption.component';
import { SelectOption as SelectOptionProp } from './select.component';
import { SelectionStrategy } from './selection.strategy';

export interface ComponentProps {
  data: SelectOptionType[];
  multiSelect?: boolean;
  strategy: SelectionStrategy<SelectOptionProp>;
  onSelect: (option: SelectOptionType, event?: GestureResponderEvent) => void;
}

export type SelectOptionsListProps = Partial<ListProps> & ComponentProps;
export type SelectOptionsListElement = React.ReactElement<SelectOptionsListProps>;

export class SelectOptionsList extends React.Component<SelectOptionsListProps> {

  private onSelect = (option: SelectOptionType, event?: GestureResponderEvent): void => {
    this.props.onSelect(option, event);
  };

  private hasItems = (item: SelectOptionType): boolean => {
    return item.items && item.items.length !== 0;
  };

  private renderGroupItem = (info: ListRenderItemInfo<SelectOptionType>): SelectGroupOptionElement => {
    const { renderItem, multiSelect, strategy } = this.props;

    return (
      <SelectGroupOption
        {...info}
        strategy={strategy}
        multi={multiSelect}
        renderItem={renderItem}
        onPress={this.onSelect}
      />
    );
  };

  private renderSingleItem = (info: ListRenderItemInfo<SelectOptionType>): SelectOptionElement => {
    return (
      <SelectOption
        {...info}
        disabled={info.item.disabled}
        selected={this.props.strategy.isSelected(info.item)}
        multi={this.props.multiSelect}
        onPress={this.onSelect}
      />
    );
  };

  private renderItem = (info: ListRenderItemInfo<SelectOptionType>): SelectOptionElement | SelectGroupOptionElement => {
    return this.hasItems(info.item) ? this.renderGroupItem(info) : this.renderSingleItem(info);
  };

  public render(): SelectOptionsListElement {
    return (
      <List
        {...this.props}
        renderItem={this.renderItem}
      />
    );
  }
}
