/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { DateService, NativeDateService } from '@ui-kitten/components';
import React from 'react';
import {
  styled,
  StyledComponentProps,
} from '../../theme';
import {
  BaseCalendarComponent,
  BaseCalendarProps,
  BaseCalendarRef,
} from './baseCalendar.component';
import { CalendarPickerCellProps } from './components/picker/calendarPickerCell.component';
import { CalendarDataService, DateBatch } from './service/calendarData.service';
import { RangeDateService } from './service/rangeDate.service';
import { CalendarRange } from './type';

export interface RangeCalendarProps<D = Date> extends StyledComponentProps, BaseCalendarProps<D> {
  range?: CalendarRange<D>;
  onSelect?: (range: CalendarRange<D>) => void;
}

export type RangeCalendarElement<D = Date> = React.ReactElement<RangeCalendarProps<D>>;

export type RangeCalendarRef<D = Date> = BaseCalendarRef<D>;

/**
 * Range Calendar provides a simple way to select a date range.
 *
 * Supports locales and different date objects like Moment.js or date-fns.
 * Composes date picker components in a horizontal pageable list.
 *
 * @extends React.Component
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
function RangeCalendar <D = Date> (
  {
    range = {},
    ...props
  }: RangeCalendarProps<D>,
  ref: React.RefObject<RangeCalendarRef<D>>,
): RangeCalendarElement {
  const dateService = props.dateService ?? new NativeDateService() as unknown as DateService<D>;
  const rangeDateService: RangeDateService<D> = new RangeDateService(dateService);
  const dataService: CalendarDataService<D> = new CalendarDataService(dateService);

  React.useImperativeHandle(ref, () => ({
    ...ref.current,
    dataService,
  }), [dataService]);

  const createDates = (date: D): DateBatch<D> => {
    return dataService.createDayPickerData(date, range);
  };

  const selectedDate = (): D | undefined => {
    return range.startDate;
  };

  const onDateSelect = (date: D): void => {
    if (props.onSelect) {
      const calendarRange: CalendarRange<D> = rangeDateService.createRange(range, date);
      props.onSelect(calendarRange);
    }
  };

  const isDateSelected = (): boolean => {
    return false;
  };

  const shouldUpdateDate = (prevProps: CalendarPickerCellProps<D>, nextProps: CalendarPickerCellProps<D>): boolean => {
    const dateChanged: boolean = dateService.compareDatesSafe(prevProps.date.date, nextProps.date.date) !== 0;

    if (dateChanged) {
      return true;
    }

    const selectionChanged: boolean = prevProps.selected !== nextProps.selected;
    const disablingChanged: boolean = prevProps.disabled !== nextProps.disabled;
    const rangeChanged: boolean = prevProps.range !== nextProps.range;
    const rangeStartPlaceChanged: boolean = prevProps.firstRangeItem !== nextProps.firstRangeItem;
    const rangeEndPlaceChanged: boolean = prevProps.lastRangeItem !== nextProps.lastRangeItem;

    const shouldUpdate: boolean =
      selectionChanged ||
      disablingChanged ||
      rangeChanged ||
      rangeStartPlaceChanged ||
      rangeEndPlaceChanged;

    if (shouldUpdate) {
      return true;
    }

    return prevProps.eva.theme !== nextProps.eva.theme;
  };

  return (
    <BaseCalendarComponent
      {...props}
      dateService={dateService}
      dataService={dataService}
      ref={ref}
      createDates={createDates}
      selectedDate={selectedDate}
      onDateSelect={onDateSelect}
      isDateSelected={isDateSelected}
      shouldUpdateDate={shouldUpdateDate}
    />
  );
}

const Component = styled('Calendar')(React.forwardRef(RangeCalendar));

export {
  Component as RangeCalendar,
};
