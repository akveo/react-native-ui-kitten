/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { useCallback, useState } from 'react';
import { CalendarViewMode, CalendarViewModes, CalendarViewModeId } from '../type';
import { DateService } from '../service/date.service';

export interface CalendarState<D> {
  viewMode: CalendarViewMode;
  visibleDate: D;
  pickerDate: D;
}

export interface UseCalendarStateResult<D> {
  state: CalendarState<D>;
  setViewMode: (viewMode: CalendarViewMode) => void;
  setVisibleDate: (date: D) => void;
  setPickerDate: (date: D) => void;
  scrollToToday: () => void;
  scrollToDate: (date: D) => void;
  onPickerNavigationPress: () => void;
  onMonthSelect: (date: D, onVisibleDateChange?: (date: D, viewModeId: CalendarViewModeId) => void) => void;
  onYearSelect: (date: D) => void;
}

export interface UseCalendarStateOptions<D> {
  dateService: DateService<D>;
  initialVisibleDate: D;
  startView?: CalendarViewMode;
  onVisibleDateChange?: (date: D, viewModeId: CalendarViewModeId) => void;
}

export function useCalendarState<D>({
  dateService,
  initialVisibleDate,
  startView = CalendarViewModes.DATE,
  onVisibleDateChange,
}: UseCalendarStateOptions<D>): UseCalendarStateResult<D> {
  const [viewMode, setViewMode] = useState<CalendarViewMode>(startView);
  const [visibleDate, setVisibleDate] = useState<D>(() =>
    dateService.getMonthStart(initialVisibleDate)
  );
  const [pickerDate, setPickerDate] = useState<D>(() =>
    dateService.getMonthStart(initialVisibleDate)
  );

  const scrollToToday = useCallback(() => {
    const today = dateService.today();
    setViewMode(CalendarViewModes.DATE);
    setVisibleDate(today);
    setPickerDate(today);
  }, [dateService]);

  const scrollToDate = useCallback((date: D) => {
    if (date) {
      setViewMode(CalendarViewModes.DATE);
      setVisibleDate(date);
      setPickerDate(date);
    }
  }, []);

  const onPickerNavigationPress = useCallback(() => {
    setViewMode(prev => prev.navigationNext());
    setPickerDate(visibleDate);
  }, [visibleDate]);

  const onMonthSelect = useCallback((date: D, onVisibleDateChangeCb?: (date: D, viewModeId: CalendarViewModeId) => void) => {
    const nextVisibleDate = dateService.createDate(
      dateService.getYear(pickerDate),
      dateService.getMonth(date),
      dateService.getDate(pickerDate),
    );

    setViewMode(prev => prev.pickNext());
    setVisibleDate(nextVisibleDate);
    setPickerDate(nextVisibleDate);

    // Call the callback after state update
    const callback = onVisibleDateChangeCb || onVisibleDateChange;
    if (callback) {
      // We need to calculate what the next view mode will be
      const nextViewMode = viewMode.pickNext();
      callback(nextVisibleDate, nextViewMode.id);
    }
  }, [dateService, pickerDate, viewMode, onVisibleDateChange]);

  const onYearSelect = useCallback((date: D) => {
    const nextPickerDate = dateService.createDate(
      dateService.getYear(date),
      dateService.getMonth(pickerDate),
      dateService.getDate(pickerDate),
    );

    setViewMode(prev => prev.pickNext());
    setPickerDate(nextPickerDate);
  }, [dateService, pickerDate]);

  return {
    state: { viewMode, visibleDate, pickerDate },
    setViewMode,
    setVisibleDate,
    setPickerDate,
    scrollToToday,
    scrollToDate,
    onPickerNavigationPress,
    onMonthSelect,
    onYearSelect,
  };
}
