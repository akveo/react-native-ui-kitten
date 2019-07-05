/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  CalendarWeek,
  CalendarWeekElement,
  CalendarWeekProps,
} from './calendarWeek.component';

interface ComponentProps<D> extends ViewProps {
  data: D[][];
  date: D;
  selectedDate: D;
  renderItem: (item: D, index: number) => React.ReactElement<any>;
  shouldComponentUpdate?: (prevProps: CalendarMonthProps<D>, nextProps: CalendarMonthProps<D>) => boolean;
  shouldUpdateWeek?: (prevProps: CalendarWeekProps<D>, nextProps: CalendarWeekProps<D>) => boolean;
}

export type CalendarMonthProps<D> = ComponentProps<D>;
export type CalendarMonthElement<D> = React.ReactElement<CalendarMonthProps<D>>;

/**
 * Calendar Month component.
 * Renders a grid of month dates.
 *
 * @extends React.Component
 *
 * @property data {D[][]} - 2-dim array of calendar month dates.
 *
 * @property date {D} - month start date.
 *
 * @property selectedDate {D} - date which is now currently selected.
 * Usable with `shouldComponentUpdate` prop.
 *
 * @property renderItem {(item: D, index: number) => ReactElement<any>} - Function which renders a cell.
 * Should return a valid ReactElement.
 *
 * @property {(prevProps: CalendarMonthProps<D>, nextProps: CalendarMonthProps<D>) => boolean}
 * shouldComponentUpdate - Delegates `shouldComponentUpdate` lifecycle.
 * This is optional but can be useful when optimizing performance.
 *
 * @property {(prevProps: CalendarWeekProps<D>, nextProps: CalendarWeekProps<D>) => boolean} shouldUpdateWeek -
 * Delegates `shouldComponentUpdate` of a week row (which is a separate component).
 * This is optional but can be useful when optimizing performance.
 */

export class CalendarMonth<D> extends React.Component<CalendarMonthProps<D>> {

  public shouldComponentUpdate(nextProps: CalendarMonthProps<D>): boolean {
    if (nextProps.shouldComponentUpdate) {
      return nextProps.shouldComponentUpdate(this.props, nextProps);
    }
    return true;
  }

  private renderWeekElement = (item: D[], index: number): CalendarWeekElement<D> => {
    return (
      <CalendarWeek
        key={index}
        data={item}
        selectedDate={this.props.selectedDate}
        renderItem={this.props.renderItem}
        shouldComponentUpdate={this.props.shouldUpdateWeek}
      />
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, data, renderItem, ...restProps } = this.props;

    return (
      <View
        {...restProps}
        style={[styles.container, style]}>
        {data.map(this.renderWeekElement)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
