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

interface ComponentProps<D> extends ViewProps {
  data: D[];
  selectedDate: D;
  renderItem: (item: D, index: number) => React.ReactElement<any>;
  shouldComponentUpdate?: (prevProps: CalendarWeekProps<D>, nextProps: CalendarWeekProps<D>) => boolean;
}

export type CalendarWeekProps<D> = ComponentProps<D>;
export type CalendarWeekElement<D> = React.ReactElement<CalendarWeekProps<D>>;

/**
 * Calendar Week component.
 * Renders a row of week dates.
 *
 * @extends React.Component
 *
 * @property data {D[]} - array of week dates.
 *
 * @property {D} selectedDate - date which is now currently selected.
 * Usable with `shouldComponentUpdate` prop.
 *
 * @property {(item: D, index: number) => ReactElement<any>} renderItem - Function which renders a cell.
 * Should return a valid ReactElement.
 *
 * @property shouldComponentUpdate {(prevProps: CalendarWeekProps<D>, nextProps: CalendarWeekProps<D>) => boolean} -
 * Delegates `shouldComponentUpdate` lifecycle.
 * This is optional but can be useful when optimizing performance.
 */

export class CalendarWeek<D> extends React.Component<CalendarWeekProps<D>> {

  public shouldComponentUpdate(nextProps: CalendarWeekProps<D>): boolean {
    if (nextProps.shouldComponentUpdate) {
      return nextProps.shouldComponentUpdate(this.props, nextProps);
    }
    return true;
  }

  public render(): React.ReactElement<ViewProps> {
    const { style, data, renderItem, ...restProps } = this.props;

    return (
      <View
        {...restProps}
        style={[styles.container, style]}>
        {data.map(renderItem)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
