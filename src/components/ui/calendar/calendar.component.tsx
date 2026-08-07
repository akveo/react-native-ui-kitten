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
import { CalendarDateInfo, CalendarViewMode, CalendarViewModes } from './type';
import { TranslationWidth } from './i18n/type';
import { DateService } from './service/date.service';
import { NativeDateService } from './service/nativeDate.service';
import { CalendarDataService } from './service/calendarData.service';
import {
  useCalendarState,
  useCalendarNavigation,
  useCalendarStyles,
  useCalendarTitle,
} from './hooks';

export interface CalendarProps<D = Date> extends BaseCalendarProps<D> {
  date?: D;
  onSelect?: (date: D) => void;
}

export type CalendarElement<D = Date> = React.ReactElement<CalendarProps<D>>;

export interface CalendarRef<D = Date> {
  scrollToToday: () => void;
  scrollToDate: (date: D) => void;
  getVisibleDate: () => D;
  getViewMode: () => CalendarViewMode;
  getPickerDate: () => D;
}

const PICKER_ROWS = 4;
const PICKER_COLUMNS = 3;

/**
 * Calendar provides a simple way to select a date.
 *
 * @method {() => void} scrollToToday - Show the current date in the calendar.
 *
 * @method {(date: D) => void} scrollToDate - Show the specific date in the calendar.
 *
 * @property {D} date - Date which is currently selected.
 * Defaults to current date.
 *
 * @property {D} initialVisibleDate - Specific date that should be shown on the first render of the component.
 * If it is not set, the selected date or today's date will be displayed.
 *
 * @property {(D) => void} onSelect - Called when date cell is pressed.
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
 * @property {boolean} boundingMonth - Whether previous and next months in the current month view should be rendered.
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
 * @overview-example CalendarSimpleUsage
 *
 * @overview-example RangeCalendarSimpleUsage
 * There is an alternative calendar component, to work with date ranges.
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
 *
 * @overview-example CalendarInitialVisibleDate
 * Calendar can show specified date on render.
 * Also, it is possible to use scrollToToday and scrollToDate to show specific dates.
 *
 * @overview-example CalendarFilters
 * Calendar may accept minimal and maximum dates, filter functions, and `boundingMonth` property,
 * which disables displaying previous month dates at the current date view.
 *
 * @overview-example CalendarLocaleSettings
 * Also, it is possible to setup locale by configuring Date Service.
 *
 * @overview-example CalendarMoment
 * Calendar is able to work with Moment, by configuring date service.
 * In order to use Moment, `@ui-kitten/moment` package is required.
 *
 * @overview-example CalendarCustomDay
 * To render custom cells, `renderDay`, `renderMonth` and `renderYear` properties may be used.
 *
 * @overview-example CalendarTheming
 * Styling of the calendar is possible with [configuring a custom theme](guides/branding).
 */

function CalendarComponent<D = Date>(
  props: CalendarProps<D>,
  ref: React.Ref<CalendarRef<D>>,
): React.ReactElement<CalendarProps<D>> {
  const {
    date,
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
  const dateService = useMemo(() => dateServiceProp || new NativeDateService() as unknown as DateService<D>, [dateServiceProp]);
  const dataService = useMemo(() => new CalendarDataService<D>(dateService), [dateService]);

  const computedMin = useMemo(() => min || dateService.getYearStart(dateService.today()), [min, dateService]);
  const computedMax = useMemo(() => max || dateService.getYearEnd(dateService.today()), [max, dateService]);

  const computedInitialDate = useMemo(() => {
    return initialVisibleDate || date || dateService.today();
  }, [initialVisibleDate, date, dateService]);

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
    getViewMode: () => viewMode,
    getPickerDate: () => pickerDate,
  }), [scrollToToday, scrollToDate, visibleDate, viewMode, pickerDate]);

  const createDates = useCallback((dateParam: D) => {
    return dataService.createDayPickerData(dateParam);
  }, [dataService]);

  const isDateSelected = useCallback((dateParam: D): boolean => {
    return dateService.isSameDaySafe(dateParam, date);
  }, [dateService, date]);

  const isDaySelected = useCallback((info: CalendarDateInfo<D>): boolean => {
    return isDateSelected(info.date);
  }, [isDateSelected]);

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
    return dateService.isSameMonthSafe(info.date, date);
  }, [dateService, date]);

  const isMonthDisabled = useCallback((info: CalendarDateInfo<D>): boolean => {
    const minMonthStart = dateService.getMonthStart(computedMin);
    const maxMonthStart = dateService.getMonthStart(computedMax);
    return !dateService.isBetweenIncludingSafe(info.date, minMonthStart, maxMonthStart);
  }, [dateService, computedMin, computedMax]);

  const isMonthToday = useCallback((info: CalendarDateInfo<D>): boolean => {
    return dateService.isSameMonthSafe(info.date, dateService.today());
  }, [dateService]);

  const isYearSelected = useCallback((info: CalendarDateInfo<D>): boolean => {
    return dateService.isSameYearSafe(info.date, date);
  }, [dateService, date]);

  const isYearDisabled = useCallback((info: CalendarDateInfo<D>): boolean => {
    const minYearStart = dateService.getYearStart(computedMin);
    const maxYearStart = dateService.getYearEnd(computedMax);
    return !dateService.isBetweenIncludingSafe(info.date, minYearStart, maxYearStart);
  }, [dateService, computedMin, computedMax]);

  const isYearToday = useCallback((info: CalendarDateInfo<D>): boolean => {
    return dateService.isSameYearSafe(info.date, dateService.today());
  }, [dateService]);

  const onDaySelect = useCallback((info: CalendarDateInfo<D>): void => {
    onSelect?.(info.date);
  }, [onSelect]);

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
    return selectionChanged || disablingChanged;
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

export const Calendar = forwardRef(CalendarComponent) as <D = Date>(
  props: CalendarProps<D> & { ref?: React.Ref<CalendarRef<D>> }
) => React.ReactElement<CalendarProps<D>>;
