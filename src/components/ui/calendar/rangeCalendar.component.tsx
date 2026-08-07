/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import { View } from 'react-native';
import { useStyled, StyleType } from '../../theme';
import { BaseCalendarProps } from './baseCalendar.component';
import { CalendarPickerCellProps } from './components/picker/calendarPickerCell.component';
import { CalendarHeader } from './components/calendarHeader.component';
import { CalendarMonthHeader } from './components/calendarMonthHeader.component';
import { CalendarPicker } from './components/picker/calendarPicker.component';
import { CalendarDateContent, CalendarDateContentElement } from './components/calendarDateContent.component';
import { Divider } from '../divider/divider.component';
import { CalendarDateInfo, CalendarRange, CalendarViewModes } from './type';
import { TranslationWidth } from './i18n/type';
import { DateService } from './service/date.service';
import { NativeDateService } from './service/nativeDate.service';
import { CalendarDataService } from './service/calendarData.service';
import { RangeDateService } from './service/rangeDate.service';
import {
  useCalendarState,
  useCalendarNavigation,
  useCalendarStyles,
  useCalendarTitle,
} from './hooks';

export interface RangeCalendarProps<D = Date> extends BaseCalendarProps<D> {
  range?: CalendarRange<D>;
  onSelect?: (range: CalendarRange<D>) => void;
}

export type RangeCalendarElement<D = Date> = React.ReactElement<RangeCalendarProps<D>>;

export interface RangeCalendarRef<D = Date> {
  scrollToToday: () => void;
  scrollToDate: (date: D) => void;
  getVisibleDate: () => D;
}

const PICKER_ROWS = 4;
const PICKER_COLUMNS = 3;
const EMPTY_RANGE: CalendarRange<any> = {};

/**
 * Range Calendar provides a simple way to select a date range.
 *
 * Supports locales and different date objects like Moment.js or date-fns.
 * Composes date picker components in a horizontal pageable list.
 *
 * @method {() => void} scrollToToday - Show the current date in the calendar.
 *
 * @method {(date: D) => void} scrollToDate - Show the specific date in the calendar.
 *
 * @property {CalendarRange<D>} range - Date range which is currently selected.
 * CalendarRange `startDate?: D, endDate?: D` - Object with start and end dates for date range.
 * A range may contain only a startDate or both startDate and endDate properties meaning completeness of picked value.
 *
 * @property {D} initialVisibleDate - Specific date that should be shown on the first render of the component.
 * If it is not set, the selected date or today's date will be displayed.
 *
 * @property {(CalendarRange) => void} onSelect - Called when day cell is pressed.
 *
 * @property {D} min - Minimal date that is able to be selected.
 *
 * @property {D} max - Maximum date that is able to be selected.
 *
 * @property {DateService<D>} dateService - Date service that is able to work with a date objects.
 * Defaults to Native Date service that works with JS Date.
 * Allows using different types of date like Moment.js or date-fns.
 * Moment.js service can be provided by installing `@ui-kitten/moment` package.
 * date-fns service can be provided by installing `@ui-kitten/date-fns` package.
 *
 * @property {boolean} boundingMonth - Defines if we should render previous and next months in the current month view.
 *
 * @property {CalendarViewMode} startView - Defines starting view for calendar.
 * Can be `CalendarViewModes.DATE`, `CalendarViewModes.MONTH` or `CalendarViewModes.YEAR`.
 * Defaults to *CalendarViewModes.DATE*.
 *
 * @property {(D, D, CalendarViewMode) => string} title - A function to transform visible date to a string displayed in
 * header for the specific view mode: first date is date picker, second date is year and month picker.
 *
 * @property {(D) => boolean} filter - A function to determine whether particular date cells should be disabled.
 *
 * @property {() => ReactElement} renderFooter - Function component
 * to render below the calendar.
 *
 * @property {(D, NamedStyles) => ReactElement} renderDay - Function component
 * to render instead of default day cell.
 * Called with a date for this cell and styles provided by Eva.
 *
 * @property {(D, NamedStyles) => ReactElement} renderMonth - Function component
 * to render instead of default month cell.
 * Called with a date for this cell and styles provided by Eva.
 *
 * @property {(D, NamedStyles) => ReactElement} renderYear - Function component
 * to render instead of default year cell.
 * Called with a date for this cell and styles provided by Eva.
 *
 * @property {ComponentType | null} renderArrowLeft - Custom component which will be used
 * to render left arrow inside header instead of default one. Custom component must invoke onPress method from
 * props to keep calendar navigation functionality.
 *
 * @property {ComponentType | null} renderArrowRight - Custom component which will be used
 * to render right arrow inside header instead of default one. Custom component must invoke onPress method from
 * props to keep calendar navigation functionality.
 *
 * @property {(D, CalendarViewMode) => void} onVisibleDateChange - Called when navigating to the previous or next
 * month / year.
 * viewMode returns string with current calendar view ("YEAR", "MONTH", "DATE").
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example RangeCalendarSimpleUsage
 *
 * @overview-example RangeCalendarType
 * Ranged calendar works with special range object - CalendarRange.
 * For empty ranges, range has no date properties.
 * And for incomplete ranges, there is only a `startDate` property.
 * ```
 * export interface CalendarRange<D> {
 *   startDate?: D;
 *   endDate?: D;
 * }
 * ```
 */

function RangeCalendarComponent<D = Date>(
  props: RangeCalendarProps<D>,
  ref: React.Ref<RangeCalendarRef<D>>,
): React.ReactElement<RangeCalendarProps<D>> {
  const {
    range: rangeProp,
    onSelect,
    min,
    max,
    initialVisibleDate,
    dateService: dateServiceProp,
    boundingMonth = true,
    startView = CalendarViewModes.DATE,
    title: customTitle,
    filter,
    renderFooter,
    renderDay,
    renderMonth,
    renderYear,
    renderArrowLeft,
    renderArrowRight,
    onVisibleDateChange,
    style,
    ...viewProps
  } = props;

  const { style: evaStyle } = useStyled('Calendar', {});
  const range = useMemo(() => rangeProp || EMPTY_RANGE as CalendarRange<D>, [rangeProp]);
  const dateService = useMemo(() => dateServiceProp || new NativeDateService() as unknown as DateService<D>, [dateServiceProp]);
  const dataService = useMemo(() => new CalendarDataService<D>(dateService), [dateService]);
  const rangeDateService = useMemo(() => new RangeDateService<D>(dateService), [dateService]);

  const computedMin = useMemo(() => min || dateService.getYearStart(dateService.today()), [min, dateService]);
  const computedMax = useMemo(() => max || dateService.getYearEnd(dateService.today()), [max, dateService]);

  const computedInitialDate = useMemo(() => {
    return initialVisibleDate || range?.startDate || dateService.today();
  }, [initialVisibleDate, range?.startDate, dateService]);

  const {
    state,
    setVisibleDate,
    setPickerDate,
    scrollToToday,
    scrollToDate,
    onPickerNavigationPress,
    onMonthSelect,
    onYearSelect,
  } = useCalendarState<D>({
    dateService,
    initialVisibleDate: computedInitialDate,
    startView,
    onVisibleDateChange,
  });

  const { viewMode, visibleDate, pickerDate } = state;

  const {
    onHeaderNavigationLeftPress,
    onHeaderNavigationRightPress,
    isHeaderNavigationAllowed,
  } = useCalendarNavigation<D>({
    dateService,
    viewMode,
    visibleDate,
    pickerDate,
    setVisibleDate,
    setPickerDate,
    onVisibleDateChange,
  });

  const calendarStyles = useCalendarStyles(evaStyle);
  const headerTitle = useCalendarTitle<D>({
    dateService,
    visibleDate,
    pickerDate,
    viewMode,
    customTitle,
  });

  useImperativeHandle(ref, () => ({
    scrollToToday,
    scrollToDate,
    getVisibleDate: () => visibleDate,
  }), [scrollToToday, scrollToDate, visibleDate]);

  const createDates = useCallback((dateParam: D) => {
    return dataService.createDayPickerData(dateParam, range);
  }, [dataService, range]);

  const isDaySelected = useCallback((): boolean => {
    // Range calendar doesn't use day selection - range props handle this
    return false;
  }, []);

  const isDayDisabled = useCallback((info: CalendarDateInfo<D>): boolean => {
    const minDayStart = dateService.createDate(
      dateService.getYear(computedMin),
      dateService.getMonth(computedMin),
      dateService.getDate(computedMin),
    );
    const maxDayStart = dateService.createDate(
      dateService.getYear(computedMax),
      dateService.getMonth(computedMax),
      dateService.getDate(computedMax),
    );
    const fitsFilter = filter && !filter(info.date) || false;
    return !dateService.isBetweenIncludingSafe(info.date, minDayStart, maxDayStart) || fitsFilter;
  }, [dateService, computedMin, computedMax, filter]);

  const isDayToday = useCallback((info: CalendarDateInfo<D>): boolean => {
    return dateService.isSameDaySafe(info.date, dateService.today());
  }, [dateService]);

  const isMonthSelected = useCallback((info: CalendarDateInfo<D>): boolean => {
    return dateService.isSameMonthSafe(info.date, range?.startDate);
  }, [dateService, range?.startDate]);

  const isMonthDisabled = useCallback((info: CalendarDateInfo<D>): boolean => {
    const minMonthStart = dateService.getMonthStart(computedMin);
    const maxMonthStart = dateService.getMonthStart(computedMax);
    return !dateService.isBetweenIncludingSafe(info.date, minMonthStart, maxMonthStart);
  }, [dateService, computedMin, computedMax]);

  const isMonthToday = useCallback((info: CalendarDateInfo<D>): boolean => {
    return dateService.isSameMonthSafe(info.date, dateService.today());
  }, [dateService]);

  const isYearSelected = useCallback((info: CalendarDateInfo<D>): boolean => {
    return dateService.isSameYearSafe(info.date, range?.startDate);
  }, [dateService, range?.startDate]);

  const isYearDisabled = useCallback((info: CalendarDateInfo<D>): boolean => {
    const minYearStart = dateService.getYearStart(computedMin);
    const maxYearStart = dateService.getYearEnd(computedMax);
    return !dateService.isBetweenIncludingSafe(info.date, minYearStart, maxYearStart);
  }, [dateService, computedMin, computedMax]);

  const isYearToday = useCallback((info: CalendarDateInfo<D>): boolean => {
    return dateService.isSameYearSafe(info.date, dateService.today());
  }, [dateService]);

  const onDaySelect = useCallback((info: CalendarDateInfo<D>): void => {
    if (onSelect) {
      const newRange = rangeDateService.createRange(range, info.date);
      onSelect(newRange);
    }
  }, [onSelect, rangeDateService, range]);

  const handleMonthSelect = useCallback((info: CalendarDateInfo<D>): void => {
    onMonthSelect(info.date, onVisibleDateChange);
  }, [onMonthSelect, onVisibleDateChange]);

  const handleYearSelect = useCallback((info: CalendarDateInfo<D>): void => {
    onYearSelect(info.date);
  }, [onYearSelect]);

  const shouldUpdateDate = useCallback((
    cellProps: CalendarPickerCellProps<D>,
    nextCellProps: CalendarPickerCellProps<D>,
  ): boolean => {
    const dateChanged = dateService.compareDatesSafe(cellProps.date.date, nextCellProps.date.date) !== 0;
    if (dateChanged) return true;

    const selectionChanged = cellProps.selected !== nextCellProps.selected;
    const disablingChanged = cellProps.disabled !== nextCellProps.disabled;
    const rangeChanged = cellProps.range !== nextCellProps.range;
    const rangeStartPlaceChanged = cellProps.firstRangeItem !== nextCellProps.firstRangeItem;
    const rangeEndPlaceChanged = cellProps.lastRangeItem !== nextCellProps.lastRangeItem;

    return selectionChanged || disablingChanged || rangeChanged || rangeStartPlaceChanged || rangeEndPlaceChanged;
  }, [dateService]);

  const getWeekdayStyle = useCallback((): StyleType => ({
    fontSize: evaStyle.weekdayTextFontSize,
    fontWeight: evaStyle.weekdayTextFontWeight,
    color: evaStyle.weekdayTextColor,
    fontFamily: evaStyle.weekdayTextFontFamily,
  }), [evaStyle]);

  const renderWeekdayElement = useCallback((weekday: string, index: number): CalendarDateContentElement => {
    return (
      <CalendarDateContent
        key={index}
        textStyle={getWeekdayStyle()}
      >
        {weekday}
      </CalendarDateContent>
    );
  }, [getWeekdayStyle]);

  const renderDayElement = useCallback((info: CalendarDateInfo<D>, cellStyle: StyleType): CalendarDateContentElement => {
    return (
      <CalendarDateContent
        style={cellStyle.container}
        textStyle={cellStyle.text}
      >
        {dateService.getDate(info.date)}
      </CalendarDateContent>
    );
  }, [dateService]);

  const renderMonthElement = useCallback((info: CalendarDateInfo<D>, cellStyle: StyleType): CalendarDateContentElement => {
    return (
      <CalendarDateContent
        style={cellStyle.container}
        textStyle={cellStyle.text}
      >
        {dateService.getMonthName(info.date, TranslationWidth.SHORT)}
      </CalendarDateContent>
    );
  }, [dateService]);

  const renderYearElement = useCallback((info: CalendarDateInfo<D>, cellStyle: StyleType): CalendarDateContentElement => {
    return (
      <CalendarDateContent
        style={cellStyle.container}
        textStyle={cellStyle.text}
      >
        {dateService.getYear(info.date)}
      </CalendarDateContent>
    );
  }, [dateService]);

  const renderDayIfNeeded = useCallback((item: CalendarDateInfo<D>, cellStyle: StyleType): React.ReactElement => {
    const shouldRender = !item.bounding || boundingMonth;
    if (shouldRender) {
      const renderSelector = renderDay || renderDayElement;
      return renderSelector(item, cellStyle);
    }
    return null;
  }, [boundingMonth, renderDay, renderDayElement]);

  const renderDayPickerElement = useCallback((): React.ReactElement => {
    return (
      <>
        <CalendarMonthHeader
          style={calendarStyles.daysHeaderContainer}
          data={dateService.getDayOfWeekNames()}
        >
          {renderWeekdayElement}
        </CalendarMonthHeader>
        <Divider style={calendarStyles.divider} />
        <CalendarPicker
          rowStyle={calendarStyles.row}
          data={createDates(visibleDate)}
          onSelect={onDaySelect}
          isItemSelected={isDaySelected}
          isItemDisabled={isDayDisabled}
          isItemToday={isDayToday}
          shouldItemUpdate={shouldUpdateDate}
        >
          {renderDayIfNeeded}
        </CalendarPicker>
      </>
    );
  }, [calendarStyles, dateService, visibleDate, createDates, onDaySelect, isDaySelected, isDayDisabled, isDayToday, shouldUpdateDate, renderWeekdayElement, renderDayIfNeeded]);

  const renderMonthPickerElement = useCallback((): React.ReactElement => {
    return (
      <CalendarPicker
        rowStyle={calendarStyles.row}
        data={dataService.createMonthPickerData(pickerDate, PICKER_ROWS, PICKER_COLUMNS)}
        onSelect={handleMonthSelect}
        isItemSelected={isMonthSelected}
        isItemDisabled={isMonthDisabled}
        isItemToday={isMonthToday}
      >
        {renderMonth || renderMonthElement}
      </CalendarPicker>
    );
  }, [calendarStyles, dataService, pickerDate, handleMonthSelect, isMonthSelected, isMonthDisabled, isMonthToday, renderMonth, renderMonthElement]);

  const renderYearPickerElement = useCallback((): React.ReactElement => {
    return (
      <CalendarPicker
        rowStyle={calendarStyles.row}
        data={dataService.createYearPickerData(pickerDate, PICKER_ROWS, PICKER_COLUMNS)}
        onSelect={handleYearSelect}
        isItemSelected={isYearSelected}
        isItemDisabled={isYearDisabled}
        isItemToday={isYearToday}
      >
        {renderYear || renderYearElement}
      </CalendarPicker>
    );
  }, [calendarStyles, dataService, pickerDate, handleYearSelect, isYearSelected, isYearDisabled, isYearToday, renderYear, renderYearElement]);

  const renderPickerElement = useCallback((): React.ReactNode => {
    switch (viewMode.id) {
      case CalendarViewModes.DATE.id:
        return renderDayPickerElement();
      case CalendarViewModes.MONTH.id:
        return renderMonthPickerElement();
      case CalendarViewModes.YEAR.id:
        return renderYearPickerElement();
      default:
        return null;
    }
  }, [viewMode.id, renderDayPickerElement, renderMonthPickerElement, renderYearPickerElement]);

  const renderFooterElement = useCallback((): React.ReactElement | null => {
    if (renderFooter) {
      return renderFooter();
    }
    return null;
  }, [renderFooter]);

  const renderHeaderElement = useCallback((): React.ReactElement => {
    return (
      <CalendarHeader
        viewModeId={viewMode.id}
        style={calendarStyles.headerContainer}
        title={headerTitle}
        titleStyle={calendarStyles.title}
        iconStyle={calendarStyles.icon}
        lateralNavigationAllowed={isHeaderNavigationAllowed()}
        onTitlePress={onPickerNavigationPress}
        onNavigationLeftPress={onHeaderNavigationLeftPress}
        onNavigationRightPress={onHeaderNavigationRightPress}
        arrowLeftComponent={renderArrowLeft}
        arrowRightComponent={renderArrowRight}
      />
    );
  }, [viewMode.id, calendarStyles, headerTitle, isHeaderNavigationAllowed, onPickerNavigationPress, onHeaderNavigationLeftPress, onHeaderNavigationRightPress, renderArrowLeft, renderArrowRight]);

  return (
    <View
      {...viewProps}
      style={[calendarStyles.container, style]}
    >
      {renderHeaderElement()}
      {renderPickerElement()}
      {renderFooterElement()}
    </View>
  );
}

export const RangeCalendar = forwardRef(RangeCalendarComponent) as <D = Date>(
  props: RangeCalendarProps<D> & { ref?: React.Ref<RangeCalendarRef<D>> }
) => React.ReactElement<RangeCalendarProps<D>>;
