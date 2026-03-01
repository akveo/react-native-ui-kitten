/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback } from 'react';
import {
  StyleProp,
  View,
  ViewProps,
} from 'react-native';
import { StyleType } from '../../../../theme';
import {
  CalendarPickerRow,
  CalendarPickerRowElement,
} from './calendarPickerRow.component';
import {
  CalendarPickerCell,
  CalendarPickerCellElement,
  CalendarPickerCellProps,
} from './calendarPickerCell.component';
import {
  CalendarDateInfo,
  RangeRole,
} from '../../type';

type ViewPropsWithoutChildren = Omit<ViewProps, 'children'>;

export interface CalendarPickerProps<D> extends ViewPropsWithoutChildren {
  data: CalendarDateInfo<D>[][];
  isItemSelected: (item: CalendarDateInfo<D>) => boolean;
  isItemDisabled: (item: CalendarDateInfo<D>) => boolean;
  isItemToday: (item: CalendarDateInfo<D>) => boolean;
  onSelect?: (item: CalendarDateInfo<D>) => void;
  children: (item: CalendarDateInfo<D>, style: StyleType) => React.ReactElement;
  shouldItemUpdate?: (props: CalendarPickerCellProps<D>, nextProps: CalendarPickerCellProps<D>) => boolean;
  rowStyle?: StyleProp<ViewProps>;
}

export type CalendarPickerElement<D> = React.ReactElement<CalendarPickerProps<D>>;

function CalendarPickerComponent<D>({
  data,
  isItemSelected,
  isItemDisabled,
  isItemToday,
  onSelect,
  children,
  shouldItemUpdate,
  rowStyle,
  ...viewProps
}: CalendarPickerProps<D>): React.ReactElement<ViewProps> {
  const renderCellElement = useCallback((item: CalendarDateInfo<D>, index: number): CalendarPickerCellElement<D> => {
    const firstRangeItem = !!(item.range & RangeRole.start);
    const lastRangeItem = !!(item.range & RangeRole.end);

    return (
      <CalendarPickerCell
        key={index}
        date={item}
        selected={isItemSelected(item)}
        disabled={isItemDisabled(item)}
        bounding={item.bounding}
        today={isItemToday(item)}
        range={!!item.range}
        firstRangeItem={firstRangeItem}
        lastRangeItem={lastRangeItem}
        onSelect={onSelect}
        shouldComponentUpdate={shouldItemUpdate}
      >
        {children}
      </CalendarPickerCell>
    );
  }, [isItemSelected, isItemDisabled, isItemToday, onSelect, shouldItemUpdate, children]);

  const renderRowElement = useCallback((item: CalendarDateInfo<D>[], index: number): CalendarPickerRowElement<D> => {
    return (
      <CalendarPickerRow
        key={index}
        style={rowStyle}
        data={item}
      >
        {renderCellElement}
      </CalendarPickerRow>
    );
  }, [rowStyle, renderCellElement]);

  return (
    <View {...viewProps}>
      {data.map(renderRowElement)}
    </View>
  );
}

export const CalendarPicker = CalendarPickerComponent;
