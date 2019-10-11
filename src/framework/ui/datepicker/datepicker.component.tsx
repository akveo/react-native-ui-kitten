import React from 'react';
import { styled } from '@kitten/theme';
import { BaseDatepickerComponent } from './baseDatepicker.component';
import {
  CalendarElement,
  Calendar,
  CalendarProps,
} from '../calendar/calendar.component';

/**
 * Styled `Datepicker` component.
 * Renders `Calendar` component in the `Popover`.
 * Supports locales and different date objects like Moment.js or date-fns.
 * Composes date picker components in a horizontal pageable list.
 *
 * @extends React.Component
 *
 * @property {(style: ImageStyle) => React.ReactElement<ImageProps>} icon - Determines the icon of the component.
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
 * @property {(date: D) => ReactElement<any>} filter - Predicate that decides which cells will be disabled.
 *
 * @property {(date: D) => void} onSelect - Selection emitter. Fires when another day cell is pressed.
 *
 * @property {(date: D, style: StyleType) => ReactElement<any>} renderDay - Should return the content of day cell.
 *
 * @property {(date: D, style: StyleType) => ReactElement<any>} renderMonth - Should return the content of month cell.
 *
 * @property {(date: D, style: StyleType) => ReactElement<any>} renderYear - Should return the content of year cell.
 *
 * @property TouchableOpacityProps
 *
 * @property StyledComponentProps
 *
 * @overview-example DatepickerSimpleUsage
 *
 * @overview-example DatepickerWithIcon
 *
 * @overview-example DatepickerBoundingMonth
 *
 * @overview-example DatepickerFilter
 *
 * @example DatepickerCustomDay
 *
 * @example DatepickerCustomLocale
 *
 * @example DatepickerMoment
 */
export class DatepickerComponent<D> extends BaseDatepickerComponent<D, CalendarProps<D>> {

  static styledComponentName: string = 'Datepicker';

  protected getComponentTitle(): string {
    if (this.props.date) {
      return this.formatDateToString(this.props.date);
    } else {
      return 'dd/mm/yyyy';
    }
  }

  protected renderCalendar(): CalendarElement<D> {
    return (
      <Calendar {...this.props}/>
    );
  }
}

export const Datepicker = styled(DatepickerComponent);
