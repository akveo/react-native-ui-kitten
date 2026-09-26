/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { useCallback } from 'react';
import { CalendarViewMode, CalendarViewModes, CalendarViewModeId } from '../type';
import { DateService } from '../service/date.service';

const PICKER_ROWS = 4;
const PICKER_COLUMNS = 3;
const VIEWS_IN_PICKER: number = PICKER_ROWS * PICKER_COLUMNS;

export interface UseCalendarNavigationOptions<D> {
  dateService: DateService<D>;
  viewMode: CalendarViewMode;
  visibleDate: D;
  pickerDate: D;
  min?: D;
  max?: D;
  setVisibleDate: (date: D) => void;
  setPickerDate: (date: D) => void;
  onVisibleDateChange?: (date: D, viewModeId: CalendarViewModeId) => void;
}

export interface UseCalendarNavigationResult {
  onHeaderNavigationLeftPress: () => void;
  onHeaderNavigationRightPress: () => void;
  isHeaderNavigationAllowed: () => boolean;
}

export function useCalendarNavigation<D>({
  dateService,
  viewMode,
  visibleDate,
  pickerDate,
  min,
  max,
  setVisibleDate,
  setPickerDate,
  onVisibleDateChange,
}: UseCalendarNavigationOptions<D>): UseCalendarNavigationResult {

  // Header arrows never leave the [min, max] window: paging past a bound lands on the bound
  // itself, so the last reachable page is the one holding min or max (#1759).
  const clampToBounds = useCallback((date: D): D => {
    if (min && dateService.compareDates(date, min) < 0) {
      return min;
    }
    if (max && dateService.compareDates(date, max) > 0) {
      return max;
    }
    return date;
  }, [dateService, min, max]);

  const createViewModeVisibleDate = useCallback((page: number): D => {
    switch (viewMode.id) {
      case CalendarViewModes.DATE.id: {
        return clampToBounds(dateService.addMonth(visibleDate, page));
      }
      case CalendarViewModes.MONTH.id: {
        return clampToBounds(dateService.addYear(pickerDate, page));
      }
      case CalendarViewModes.YEAR.id: {
        return clampToBounds(dateService.addYear(pickerDate, VIEWS_IN_PICKER * page));
      }
      default:
        return visibleDate;
    }
  }, [dateService, viewMode.id, visibleDate, pickerDate, clampToBounds]);

  const onHeaderNavigationLeftPress = useCallback(() => {
    const nextDate = createViewModeVisibleDate(-1);

    if (viewMode.id === CalendarViewModes.DATE.id) {
      setVisibleDate(nextDate);
      onVisibleDateChange?.(nextDate, viewMode.id);
    } else {
      setPickerDate(nextDate);
    }
  }, [createViewModeVisibleDate, viewMode.id, setVisibleDate, setPickerDate, onVisibleDateChange]);

  const onHeaderNavigationRightPress = useCallback(() => {
    const nextDate = createViewModeVisibleDate(1);

    if (viewMode.id === CalendarViewModes.DATE.id) {
      setVisibleDate(nextDate);
      onVisibleDateChange?.(nextDate, viewMode.id);
    } else {
      setPickerDate(nextDate);
    }
  }, [createViewModeVisibleDate, viewMode.id, setVisibleDate, setPickerDate, onVisibleDateChange]);

  const isHeaderNavigationAllowed = useCallback((): boolean => {
    return viewMode.id !== CalendarViewModes.MONTH.id;
  }, [viewMode.id]);

  return {
    onHeaderNavigationLeftPress,
    onHeaderNavigationRightPress,
    isHeaderNavigationAllowed,
  };
}
