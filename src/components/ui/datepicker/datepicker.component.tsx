import React from 'react';
import { styled } from '@kitten/theme';
import {
  BaseDatepickerComponent,
  BaseDatepickerProps,
} from './baseDatepicker.component';
import {
  Calendar,
  CalendarElement,
  CalendarProps,
} from '../calendar/calendar.component';

export type DatepickerProps<D = Date> = BaseDatepickerProps<D> & CalendarProps<D>;
export type DatepickerElement<D = Date> = React.ReactElement<DatepickerProps<D>>;

/**
 * Styled `Datepicker` component.
 * Renders `Calendar` component in the `Popover`.
 * Supports locales and different date objects like Moment.js or date-fns.
 * Composes date picker components in a horizontal pageable list.
 *
 * @extends React.Component
 *
 * @method {() => void} show - Sets picker visible.
 *
 * @method {() => void} hide - Sets picker invisible.
 *
 * @method {() => void} focus - Focuses Datepicker and sets it visible.
 *
 * @method {() => void} blur - Removes focus from Datepicker and sets it invisible. This is the opposite of `focus()`.
 *
 * @method {() => boolean} isFocused - Returns true if the Datepicker is currently focused and visible.
 *
 * @method {() => void} clear - Removes all text from the Datepicker.
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
 * @property {string} label - Determines text rendered at the top of the component.
 *
 * @property {string} caption - Determines caption text rendered at the bottom of the component.
 *
 * @property {(style: StyleType) => ReactElement} icon - Determines icon of the component.
 *
 * @property {(style: StyleType) => ReactElement} captionIcon - Determines caption icon.
 *
 * @property {StyleProp<TextStyle>} labelStyle - Customizes label style.
 *
 * @property {StyleProp<TextStyle>} captionStyle - Customizes caption style.
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
 * @property {() => ReactElement} renderFooter - Should return the footer.
 *
 * @property {string | PopoverPlacement} placement - Determines the actualPlacement of the popover.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Default is `bottom`.
 * Tip: use one of predefined placements instead of strings, e.g `PopoverPlacements.TOP`
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example DatepickerSimpleUsage
 *
 * @overview-example DatepickerWithIcon
 *
 * @overview-example DatepickerBoundingMonth
 *
 * @overview-example DatepickerFilter
 *
 * @overview-example DatepickerStatus
 *
 * @overview-example DatepickerSize
 *
 * @example DatepickerCustomDay
 *
 * @example DatepickerCustomLocale
 *
 * @example DatepickerMoment
 */

export class DatepickerComponent<D = Date> extends BaseDatepickerComponent<DatepickerProps<D>, D> {

  static styledComponentName: string = 'Datepicker';

  constructor(props: DatepickerProps<D>) {
    super(props);
    this.clear = this.clear.bind(this);
  }

  public clear = (): void => {
    if (this.props.onSelect) {
      this.props.onSelect(null);
    }
  };

  private get calendarProps(): CalendarProps<D> {
    return {
      min: this.props.min,
      max: this.props.max,
      date: this.props.date,
      dateService: this.props.dateService,
      boundingMonth: this.props.boundingMonth,
      startView: this.props.startView,
      filter: this.props.filter,
      title: this.props.title,
      onSelect: this.props.onSelect,
      renderDay: this.props.renderDay,
      renderYear: this.props.renderYear,
      renderFooter: this.props.renderFooter,
    };
  }

  // BaseDatepickerComponent

  protected getComponentTitle(): string {
    if (this.props.date) {
      return this.formatDateToString(this.props.date);
    } else {
      return this.props.placeholder;
    }
  }

  protected renderCalendar(): CalendarElement<D> {
    return (
      // @ts-ignore
      <Calendar {...this.calendarProps} />
    );
  }
}

export const Datepicker = styled<DatepickerProps>(DatepickerComponent);
