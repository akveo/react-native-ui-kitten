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

export interface CalendarProps<D = Date> extends StyledComponentProps, BaseCalendarProps<D> {
  date?: D;
  onSelect?: (date: D) => void;
}

export type CalendarElement<D = Date> = React.ReactElement<CalendarProps<D>>;

export type CalendarRef<D = Date> = BaseCalendarRef<D> & {
  dataService: CalendarDataService<D>;
};

/**
 * Calendar provides a simple way to select a date.
 *
 * @extends React.Component
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
function Calendar <D = Date> (
  props: CalendarProps<D>,
  ref: React.RefObject<CalendarRef<D>>,
): CalendarElement<D> {
  const dateService = props.dateService ?? new NativeDateService() as unknown as DateService<D>;
  const dataService: CalendarDataService<D> = new CalendarDataService(dateService);

  React.useImperativeHandle(ref, () => ({
    ...ref.current,
    dataService,
  }), [dataService]);

  const createDates = (date: D): DateBatch<D> => {
    return dataService.createDayPickerData(date);
  };

  const selectedDate = (): D | undefined => {
    return props.date;
  };

  const onDateSelect = (date: D): void => {
    props.onSelect?.(date);
  };

  const isDateSelected = (date: D): boolean => {
    return dateService.isSameDaySafe(date, selectedDate());
  };

  const shouldUpdateDate = (prevProps: CalendarPickerCellProps<D>, nextProps: CalendarPickerCellProps<D>): boolean => {
    const dateChanged: boolean = dateService.compareDatesSafe(
      prevProps.date.date,
      nextProps.date.date,
    ) !== 0;

    if (dateChanged) {
      return true;
    }

    const selectionChanged: boolean = prevProps.selected !== nextProps.selected;
    const disablingChanged: boolean = prevProps.disabled !== nextProps.disabled;

    const value: boolean = selectionChanged || disablingChanged;

    if (value) {
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

const component = styled('Calendar')(React.forwardRef(Calendar));

export {
  component as Calendar,
};
