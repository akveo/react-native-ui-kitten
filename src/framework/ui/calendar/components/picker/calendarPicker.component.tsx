/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import { StyleType } from '@kitten/theme';
import {
  CalendarPickerRow,
  CalendarPickerRowElement,
} from './calendarPickerRow.component';
import {
  CalendarPickerCell,
  CalendarPickerCellElement,
  CalendarPickerCellProps,
} from './calendarPickerCell.component';
import { CalendarDateInfo } from '../../type';

interface ComponentProps<D> extends ViewProps {
  data: CalendarDateInfo<D>[][];
  category: string;
  isItemSelected: (item: CalendarDateInfo<D>) => boolean;
  isItemDisabled: (item: CalendarDateInfo<D>) => boolean;
  isItemToday: (item: CalendarDateInfo<D>) => boolean;
  onSelect?: (item: CalendarDateInfo<D>) => void;
  renderItem: (item: CalendarDateInfo<D>, style: StyleType) => React.ReactElement<any>;
  shouldItemUpdate?: (props: CalendarPickerCellProps<D>, nextProps: CalendarPickerCellProps<D>) => boolean;
}

export type CalendarPickerProps<D> = ComponentProps<D>;
export type CalendarPickerElement<D> = React.ReactElement<CalendarPickerProps<D>>;

export class CalendarPicker<D> extends React.Component<CalendarPickerProps<D>> {

  private renderCellElement = (item: CalendarDateInfo<D>, index: number): CalendarPickerCellElement<D> => {
    return (
      <CalendarPickerCell
        key={index}
        date={item}
        category={this.props.category}
        selected={this.props.isItemSelected(item)}
        disabled={this.props.isItemDisabled(item)}
        bounding={item.bounding}
        today={this.props.isItemToday(item)}
        onSelect={this.props.onSelect}
        shouldComponentUpdate={this.props.shouldItemUpdate}>
        {this.props.renderItem}
      </CalendarPickerCell>
    );
  };

  private renderRowElement = (item: CalendarDateInfo<D>[], index: number): CalendarPickerRowElement<D> => {
    return (
      <CalendarPickerRow
        key={index}
        data={item}
        renderItem={this.renderCellElement}
      />
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const { data, renderItem, ...restProps } = this.props;

    return (
      <View
        {...restProps}>
        {data.map(this.renderRowElement)}
      </View>
    );
  }
}
