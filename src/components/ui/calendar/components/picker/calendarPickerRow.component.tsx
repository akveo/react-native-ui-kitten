/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import { CalendarPickerCellElement } from './calendarPickerCell.component';
import { CalendarDateInfo } from '../../type';

type ViewPropsWithoutChildren = Omit<ViewProps, 'children'>;

export interface CalendarPickerRowProps<D> extends ViewPropsWithoutChildren {
  data: CalendarDateInfo<D>[];
  children: (item: CalendarDateInfo<D>, index: number) => CalendarPickerCellElement<D>;
}

export type CalendarPickerRowElement<D> = React.ReactElement<CalendarPickerRowProps<D>>;

function CalendarPickerRowComponent<D>({
  style,
  data,
  children,
  ...viewProps
}: CalendarPickerRowProps<D>): React.ReactElement<ViewProps> {
  return (
    <View
      {...viewProps}
      style={[styles.container, style]}
    >
      {data.map(children)}
    </View>
  );
}

export const CalendarPickerRow = CalendarPickerRowComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
});
