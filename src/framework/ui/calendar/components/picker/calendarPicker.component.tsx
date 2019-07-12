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

interface ComponentProps<D> extends ViewProps {
  data: D[][];
  isItemSelected: (item: D) => boolean;
  isItemDisabled: (item: D) => boolean;
  isItemToday: (item: D) => boolean;
  onSelect?: (item: D) => void;
  renderItem: (item: D, style: StyleType) => React.ReactElement<any>;
  shouldItemUpdate?: (props: CalendarPickerCellProps<D>, nextProps: CalendarPickerCellProps<D>) => boolean;
}

export type CalendarPickerProps<D> = ComponentProps<D>;
export type CalendarPickerElement<D> = React.ReactElement<CalendarPickerProps<D>>;

export class CalendarPicker<D> extends React.Component<CalendarPickerProps<D>> {

  private renderCellElement = (item: D, index: number): CalendarPickerCellElement<D> => {
    return (
      <CalendarPickerCell
        key={index}
        date={item}
        selected={this.props.isItemSelected(item)}
        disabled={this.props.isItemDisabled(item)}
        today={this.props.isItemToday(item)}
        onSelect={this.props.onSelect}
        shouldComponentUpdate={this.props.shouldItemUpdate}>
        {this.props.renderItem}
      </CalendarPickerCell>
    );
  };

  private renderRowElement = (item: D[], index: number): CalendarPickerRowElement<D> => {
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
