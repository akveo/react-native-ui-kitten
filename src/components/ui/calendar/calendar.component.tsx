/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  styled,
  StyledComponentProps,
} from '@kitten/theme';
import {
  BaseCalendarComponent,
  BaseCalendarProps,
} from './baseCalendar.component';
import { CalendarPickerCellProps } from './components/picker/calendarPickerCell.component';
import { DateBatch } from './service/calendarData.service';

export interface CalendarProps<D = Date> extends StyledComponentProps, BaseCalendarProps<D> {
  date?: D;
  onSelect: (date: D) => void;
}

export type CalendarElement<D = Date> = React.ReactElement<CalendarProps<D>>;

/**
 * Styled `Calendar` component.
 * Supports locales and different date objects like Moment.js or date-fns.
 * Composes date picker components in a horizontal pageable list.
 *
 * @extends React.Component
 *
 * @property {D} min - Minimal date that is able to be selected.
 *
 * @property {D} max - Maximum date that is able to be selected.
 *
 * @property {D} date - Date which is currently selected.
 *
 * @property {DateService<D>} dateService - Date service that is able to work with a date objects.
 * Defaults to Native Date service that works with JS Date.
 * Allows using different types of date like Moment.js or date-fns.
 *
 * @property {boolean} boundingMonth - Defines if we should render previous and next months in the current month view.
 *
 * @property {CalendarViewMode} startView - Defines starting view for calendar. Defaults to Date view.
 *
 * @property {(date: D) => string} title - Defines the title for visible date.
 *
 * @property {(date: D) => boolean} filter - Predicate that decides which cells will be disabled.
 *
 * @property {(date: D) => void} onSelect - Selection emitter. Fires when another day cell is pressed.
 *
 * @property {(date: D, style: StyleType) => ReactElement} renderDay - Should return the content of day cell.
 *
 * @property {(date: D, style: StyleType) => ReactElement} renderMonth - Should return the content of month cell.
 *
 * @property {(date: D, style: StyleType) => ReactElement} renderYear - Should return the content of year cell.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example CalendarSimpleUsage
 *
 * @overview-example CalendarBoundingMonth
 *
 * @overview-example CalendarFilter
 *
 * @overview-example CalendarBounds
 *
 * @overview-example CalendarStartDayOfWeek
 *
 * @overview-example CalendarCustomLocale
 *
 * @example CalendarMoment
 *
 * @example CalendarCustomDay
 */
export class CalendarComponent<D = Date> extends BaseCalendarComponent<CalendarProps<D>, D> {

  static styledComponentName: string = 'Calendar';

  constructor(props: CalendarProps<D>) {
    super(props);

    this.createDates = this.createDates.bind(this);
    this.selectedDate = this.selectedDate.bind(this);
    this.onDateSelect = this.onDateSelect.bind(this);
    this.isDateSelected = this.isDateSelected.bind(this);
    this.shouldUpdateDate = this.shouldUpdateDate.bind(this);
  }

  // BaseCalendarComponent

  protected createDates(date: D): DateBatch<D> {
    return this.dataService.createDayPickerData(date);
  }

  protected selectedDate(): D {
    return this.props.date || this.dateService.today();
  }

  protected onDateSelect(date: D): void {
    if (this.props.onSelect) {
      this.props.onSelect(date);
    }
  }

  protected isDateSelected(date: D): boolean {
    return this.dateService.isSameDaySafe(date, this.selectedDate());
  }

  protected shouldUpdateDate(props: CalendarPickerCellProps<D>, nextProps: CalendarPickerCellProps<D>): boolean {
    const dateChanged: boolean = this.dateService.compareDatesSafe(props.date.date, nextProps.date.date) !== 0;

    if (dateChanged) {
      return true;
    }

    const selectionChanged: boolean = props.selected !== nextProps.selected;
    const disablingChanged: boolean = props.disabled !== nextProps.disabled;

    const value: boolean = selectionChanged || disablingChanged;

    if (value) {
      return true;
    }

    return props.theme !== nextProps.theme;
  }
}

export const Calendar = styled<CalendarProps>(CalendarComponent);
