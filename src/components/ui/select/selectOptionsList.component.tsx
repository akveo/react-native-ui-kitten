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

export interface SelectOptionsListProps extends Omit<ListProps, 'renderItem'> {
  multiSelect: boolean;
  isOptionSelected: (item: SelectOptionType) => boolean;
  isOptionGroup: (item: SelectOptionType) => boolean;
  onSelect: (option: SelectOptionType, event?: GestureResponderEvent) => void;
}

export type SelectOptionsListElement = React.ReactElement<SelectOptionsListProps>;

export class SelectOptionsList extends React.Component<SelectOptionsListProps> {

  private renderSingleItem = (info: ListRenderItemInfo<SelectOptionType>): SelectOptionElement => {
    return (
      <SelectOption
        item={info.item}
        multi={this.props.multiSelect}
        selected={this.props.isOptionSelected(info.item)}
        disabled={info.item.disabled}
        onSelect={this.props.onSelect}
      />
    );
  };

  private renderGroupItem = (info: ListRenderItemInfo<SelectOptionType>): SelectGroupOptionElement => {
    return (
      <SelectGroupOption
        item={info.item}
        multi={this.props.multiSelect}
        isOptionSelected={this.props.isOptionSelected}
        onSelect={this.props.onSelect}
      />
    );
  };

  private renderItem = (info: ListRenderItemInfo<SelectOptionType>): SelectOptionElement | SelectGroupOptionElement => {
    return this.props.isOptionGroup(info.item) ? this.renderGroupItem(info) : this.renderSingleItem(info);
  };

  public render(): SelectOptionsListElement {
    return (
      <List
        style={this.props.style}
        bounces={false}
        data={this.props.data}
        renderItem={this.renderItem}
      />
    );
  }
}
