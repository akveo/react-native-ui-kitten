import React from 'react';
import {
  BaseCalendarComponent,
  BaseCalendarProps,
} from './baseCalendar.component';
import {
  styled,
  StyledComponentProps,
} from '@kitten/theme';
import { CalendarDateInfo } from './type';
import { CalendarPickerCellProps } from './components/picker/calendarPickerCell.component';
import { DateBatch } from './service/calendarData.service';

export interface ComponentProps<D> {
  date?: D;
  onSelect: (date: D) => void;
}

export type CalendarProps<D> = ComponentProps<D> & BaseCalendarProps<D> & StyledComponentProps;
export type CalendarElement<D> = React.ReactElement<CalendarProps<D>>;

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
 * @property {(date: D) => string} todayTitle - Defines the title for today's date.
 *
 * @property {(date: D) => boolean} filter - Predicate that decides which cells will be disabled.
 *
 * @property {(date: D) => void} onSelect - Selection emitter. Fires when another day cell is pressed.
 *
 * @property {(date: D, style: StyleType) => ReactElement<any>} renderDay - Should return the content of day cell.
 *
 * @property {(date: D, style: StyleType) => ReactElement<any>} renderMonth - Should return the content of month cell.
 *
 * @property {(date: D, style: StyleType) => ReactElement<any>} renderYear - Should return the content of year cell.
 *
 * @overview-example CalendarSimpleUsage
 *
 * @overview-example CalendarBoundingMonth
 *
 * @overview-example CalendarFilter
 *
 * @overview-example CalendarCustomLocale
 *
 * @example CalendarMoment
 *
 * @example CalendarCustomDay
 */
export class CalendarComponent<D> extends BaseCalendarComponent<D, CalendarProps<D>> {

  static styledComponentName: string = 'Calendar';

  // BaseCalendarComponent

  public onDaySelect(date: CalendarDateInfo<D>): void {
    if (this.props.onSelect) {
      this.props.onSelect(date.date);
    }
  }

  public getDayPickerData(date: CalendarDateInfo<D>): DateBatch<D> {
    return this.dataService.createDayPickerData(date.date);
  }

  public getSelectedDate(): D {
    return this.props.date || this.dateService.today();
  }

  public isDaySelected(date: CalendarDateInfo<D>): boolean {
    return this.dateService.isSameDaySafe(date.date, this.getSelectedDate());
  }

  public shouldUpdateDayElement(props: CalendarPickerCellProps<D>,
                                nextProps: CalendarPickerCellProps<D>): boolean {

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

export const Calendar = styled(CalendarComponent);
