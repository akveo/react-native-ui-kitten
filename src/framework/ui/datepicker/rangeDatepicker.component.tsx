import React from 'react';
import { styled } from '@kitten/theme';
import {
  BaseDatepickerComponent,
  BaseDatepickerProps,
} from './baseDatepicker.component';
import {
  RangeCalendar,
  RangeCalendarProps,
  RangeCalendarElement,
} from '../calendar/rangeCalendar.component';

export type RangeDatepickerProps<D = Date> = BaseDatepickerProps<D> & RangeCalendarProps<D>;
export type RangeDatepickerElement<D = Date> = React.ReactElement<RangeDatepickerProps<D>>;

/**
 * Styled `RangeDatepicker` component.
 * Renders `RangeCalendar` component in the `Popover`.
 * Supports locales and different date objects like Moment.js or date-fns.
 * Composes date picker components in a horizontal pageable list.
 *
 * @extends React.Component
 *
 * @property {(style: ImageStyle) => ReactElement} icon - Determines the icon of the component.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Default is `basic`.
 *
 * @property {string} size - Determines the size of the component.
 * Can be `small`, `medium` or `large`.
 * Default is `medium`.
 *
 * @property {boolean} disabled - Determines whether component is disabled.
 * Default is `false.
 *
 * @property {string} placeholder - Determines placeholder of the component.
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
 * @property {(date: D, style: StyleType) => ReactElement} renderDay - Should return the content of day cell.
 *
 * @property {(date: D, style: StyleType) => ReactElement} renderMonth - Should return the content of month cell.
 *
 * @property {(date: D, style: StyleType) => ReactElement} renderYear - Should return the content of year cell.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example RangeDatepickerSimpleUsage
 */

export class RangeDatepickerComponent<D = Date> extends BaseDatepickerComponent<RangeDatepickerProps<D>, D> {

  static styledComponentName: string = 'Datepicker';

  // BaseDatepickerComponent

  protected getComponentTitle(): string {
    const { startDate, endDate } = this.props.range;

    if (startDate || endDate) {
      const start: string = startDate ? this.formatDateToString(startDate) : '';
      const end: string = endDate ? this.formatDateToString(endDate) : '';

      return `${start} - ${end}`;
    } else {
      return this.props.placeholder;
    }
  }

  protected renderCalendar(): RangeCalendarElement<D> {
    return (
      // @ts-ignore
      <RangeCalendar {...this.props}/>
    );
  }
}

export const RangeDatepicker = styled<RangeDatepickerProps>(RangeDatepickerComponent);
