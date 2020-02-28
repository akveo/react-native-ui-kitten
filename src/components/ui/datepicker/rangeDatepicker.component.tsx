/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { styled } from '../../theme';
import {
  BaseDatepickerComponent,
  BaseDatepickerProps,
} from './baseDatepicker.component';
import {
  RangeCalendar,
  RangeCalendarElement,
  RangeCalendarProps,
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
 * @method {() => void} show - Sets picker visible.
 *
 * @method {() => void} hide - Sets picker invisible.
 *
 * @method {() => void} focus - Focuses Datepicker and sets it visible.
 *
 * @method {() => void} blur - Removes focus from Datepicker and sets it invisible.
 *
 * @method {() => boolean} isFocused - Returns true if the Datepicker is currently focused and visible.
 *
 * @method {() => void} clear - Removes all text from the Datepicker.
 *
 * @property {{ startDate?: D, endDate?: D }} range - Determines the selected date range.
 *
 * @property {(range: { startDate?: D, endDate?: D }) => void} onSelect - Called when day cell is pressed.
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
 * @property {boolean} boundingMonth - Defines if previous and next months should be rendered in the current month view.
 *
 * @property {(date: D, styles: NamedStyles) => ReactElement} renderDay - A function component
 * to render instead of default day cell.
 * Called with a date for this cell and styles provided by Eva.
 *
 * @property {(date: D, styles: NamedStyles) => ReactElement} renderMonth - A function component
 * to render instead of default month cell.
 * Called with a date for this cell and styles provided by Eva.
 *
 * @property {(date: D, styles: NamedStyles) => ReactElement} renderYear - A function component
 * to render instead of default year cell.
 * Called with a date for this cell and styles provided by Eva.
 *
 * @property {() => ReactElement} renderFooter - A function component
 * to render to the bottom of the calendar.
 *
 * @property {CalendarViewMode} startView - Defines starting view for calendar.
 * Can be `CalendarViewModes.DATE`, `CalendarViewModes.MONTH` or `CalendarViewModes.YEAR`.
 * Default is `CalendarViewModes.DATE`.
 *
 * @property {(date: D) => string} title - Defines the title for visible date.
 *
 * @property {(date: D) => boolean} filter - Predicate that decides which cells will be disabled.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Default is `basic`.
 *
 * @property {string} size - Determines the size of the component.
 * Can be `small`, `medium` or `large`.
 * Default is `medium`.
 *
 * @property {string | (props: TextProps)} placeholder - A string or a function component
 * to render when input field is empty.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {string | (props: TextProps) => ReactElement} label - A string or a function component
 * to render to top of the input field.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {(props: ImageProps) => ReactElement} accessoryLeft - A function component
 * to render to start of the text.
 * Called with props provided by Eva.
 *
 * @property {(props: ImageProps) => ReactElement} accessoryRight - A function component
 * to render to end of the text.
 * Called with props provided by Eva.
 *
 * @property {string | (props: TextProps) => ReactElement} caption - A string or a function component
 * to render to bottom of the input field.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {(props: ImageProps) => ReactElement} captionIcon - A function component
 * to render to start of the `caption`.
 * Called with props provided by Eva.
 *
 * @property {() => void} onFocus - Called when picker becomes visible.
 *
 * @property {() => void} onBlur - Called when picker becomes invisible.
 *
 * @property {string | PopoverPlacement} placement - Position of the picker relative to the input field.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Default is `bottom`.
 * Tip: use one of predefined placements instead of strings, e.g `PopoverPlacements.TOP`
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Determines the style of backdrop.
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
 * @example DatepickerDateFormat
 *
 * @example DatepickerMoment
 */
export class RangeDatepickerComponent<D = Date> extends BaseDatepickerComponent<RangeDatepickerProps<D>, D> {

  static styledComponentName: string = 'Datepicker';

  constructor(props: RangeDatepickerProps<D>) {
    super(props);
    this.clear = this.clear.bind(this);
  }

  public clear = (): void => {
    if (this.props.onSelect) {
      this.props.onSelect({});
    }
  };

  private get calendarProps(): RangeCalendarProps<D> {
    return {
      min: this.props.min,
      max: this.props.max,
      range: this.props.range,
      dateService: this.props.dateService,
      boundingMonth: this.props.boundingMonth,
      startView: this.props.startView,
      filter: this.props.filter,
      title: this.props.title,
      onSelect: this.props.onSelect,
      renderDay: this.props.renderDay,
      renderMonth: this.props.renderMonth,
      renderYear: this.props.renderYear,
      renderFooter: this.props.renderFooter,
    };
  }

  // BaseDatepickerComponent

  protected getComponentTitle(): React.ReactText {
    const { startDate, endDate } = this.props.range;

    if (startDate || endDate) {
      const start: string = startDate ? this.props.dateService.format(startDate, null) : '';
      const end: string = endDate ? this.props.dateService.format(endDate, null) : '';

      return `${start} - ${end}`;
    } else {
      return this.props.placeholder;
    }
  }

  protected renderCalendar(): RangeCalendarElement<D> {
    return (
      // @ts-ignore
      <RangeCalendar {...this.calendarProps} />
    );
  }
}

export const RangeDatepicker = styled<RangeDatepickerProps>(RangeDatepickerComponent);
