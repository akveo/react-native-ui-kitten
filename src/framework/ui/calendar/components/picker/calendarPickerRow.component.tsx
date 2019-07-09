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
import { CalendarPickerCellElement } from './calendarPickerCell.component';

interface ComponentProps<D> extends ViewProps {
  data: D[];
  renderItem: (item: D, index: number) => CalendarPickerCellElement<D>;
}

export type CalendarPickerRowProps<D> = ComponentProps<D>;
export type CalendarPickerRowElement<D> = React.ReactElement<CalendarPickerRowProps<D>>;

export class CalendarPickerRow<D> extends React.Component<CalendarPickerRowProps<D>> {

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
