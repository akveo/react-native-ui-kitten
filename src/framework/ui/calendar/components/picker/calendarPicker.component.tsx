/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  ViewProps,
  StyleProp,
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
  rowStyle?: StyleProp<ViewProps>;
}

export type CalendarPickerProps<D> = ComponentProps<D>;
export type CalendarPickerElement<D> = React.ReactElement<CalendarPickerProps<D>>;

export class CalendarPicker<D> extends React.Component<CalendarPickerProps<D>> {

  private getRangedRowItems = (row: CalendarDateInfo<D>[]): CalendarDateInfo<D>[] => {
    return row.filter((date: CalendarDateInfo<D>) => {
      return date.range === true;
    });
  };

  private isFirstRangeItem = (item: CalendarDateInfo<D>, row: CalendarDateInfo<D>[]): boolean => {
    return this.getRangedRowItems(row).indexOf(item) === 0;
  };

  private isLastRangeItem = (item: CalendarDateInfo<D>, row: CalendarDateInfo<D>[]): boolean => {
    const ranged: CalendarDateInfo<D>[] = this.getRangedRowItems(row);

    return ranged.indexOf(item) === ranged.length - 1;
  };

  private renderCellElement = (item: CalendarDateInfo<D>,
                               index: number,
                               row: CalendarDateInfo<D>[]): CalendarPickerCellElement<D> => {

    const isFirstRangeItem: boolean = this.isFirstRangeItem(item, row);
    const isLastRangeItem: boolean = this.isLastRangeItem(item, row);

    return (
      <CalendarPickerCell
        key={index}
        date={item}
        category={this.props.category}
        selected={this.props.isItemSelected(item)}
        disabled={this.props.isItemDisabled(item)}
        bounding={item.bounding}
        today={this.props.isItemToday(item)}
        range={item.range}
        firstRangeItem={isFirstRangeItem}
        lastRangeItem={isLastRangeItem}
        onSelect={this.props.onSelect}
        shouldComponentUpdate={this.props.shouldItemUpdate}>
        {this.props.renderItem}
      </CalendarPickerCell>
    );
  };

  private renderRowElement = (item: CalendarDateInfo<D>[], index: number): CalendarPickerRowElement<D> => {
    const { rowStyle } = this.props;

    // todo: refactor somehow renderItem
    return (
      <CalendarPickerRow
        style={rowStyle}
        key={index}
        data={item}
        renderItem={(date: CalendarDateInfo<D>, counter: number) => {
          return this.renderCellElement(date, counter, item);
        }}
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
