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
import { RangeDateService } from './service/rangeDate.service';
import { CalendarRange } from './type';

export interface RangeCalendarProps<D = Date> extends StyledComponentProps, BaseCalendarProps<D> {
  range: CalendarRange<D>;
  onSelect: (range: CalendarRange<D>) => void;
}

export type RangeCalendarElement<D = Date> = React.ReactElement<RangeCalendarProps<D>>;

/**
 * Styled `RangeCalendar` component.
 * Supports locales and different date objects like Moment.js or date-fns.
 * Composes date picker components in a horizontal pageable list.
 *
 * @extends React.Component
 *
 * @property {D} min - Minimal date that is able to be selected.
 *
 * @property {D} max - Maximum date that is able to be selected.
 *
 * @property {CalendarRange<D>} range - Range which is currently selected.
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
 * @overview-example RangeCalendarSimpleUsage
 */
export class RangeCalendarComponent<D = Date> extends BaseCalendarComponent<RangeCalendarProps<D>, D> {

  static styledComponentName: string = 'Calendar';

  private rangeDateService: RangeDateService<D> = new RangeDateService(this.dateService);

  constructor(props: RangeCalendarProps<D>) {
    super(props);

    this.createDates = this.createDates.bind(this);
    this.selectedDate = this.selectedDate.bind(this);
    this.onDateSelect = this.onDateSelect.bind(this);
    this.isDateSelected = this.isDateSelected.bind(this);
    this.shouldUpdateDate = this.shouldUpdateDate.bind(this);
  }

  // BaseCalendarComponent

  protected createDates(date: D): DateBatch<D> {
    return this.dataService.createDayPickerData(date, this.props.range);
  }

  protected selectedDate(): D {
    return this.dateService.today();
  }

  protected onDateSelect(date: D): void {
    if (this.props.onSelect) {
      const range: CalendarRange<D> = this.rangeDateService.createRange(this.props.range, date);
      this.props.onSelect(range);
    }
  }

  protected isDateSelected(date: D): boolean {
    return false;
  }

  protected shouldUpdateDate(props: CalendarPickerCellProps<D>, nextProps: CalendarPickerCellProps<D>): boolean {
    const dateChanged: boolean = this.dateService.compareDatesSafe(props.date.date, nextProps.date.date) !== 0;

    if (dateChanged) {
      return true;
    }

    const selectionChanged: boolean = props.selected !== nextProps.selected;
    const disablingChanged: boolean = props.disabled !== nextProps.disabled;
    const rangeChanged: boolean = props.range !== nextProps.range;
    const rangeStartPlaceChanged: boolean = props.firstRangeItem !== nextProps.firstRangeItem;
    const rangeEndPlaceChanged: boolean = props.lastRangeItem !== nextProps.lastRangeItem;

    const shouldUpdate: boolean =
      selectionChanged
      || disablingChanged
      || rangeChanged
      || rangeStartPlaceChanged
      || rangeEndPlaceChanged;

    if (shouldUpdate) {
      return true;
    }

    return props.theme !== nextProps.theme;
  }
}

export const RangeCalendar = styled<RangeCalendarProps>(RangeCalendarComponent);
