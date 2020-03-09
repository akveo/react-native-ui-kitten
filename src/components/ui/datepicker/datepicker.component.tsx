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
  Calendar,
  CalendarElement,
  CalendarProps,
} from '../calendar/calendar.component';
import { RenderProp } from '@ui-kitten/components/devsupport';
import { TextProps } from '@ui-kitten/components';

export type DatepickerProps<D = Date> = BaseDatepickerProps<D> & CalendarProps<D>;
export type DatepickerElement<D = Date> = React.ReactElement<DatepickerProps<D>>;

/**
 * Date picker provides a simple way to select a date within a picker displayed in modal.
 *
 * Renders an Input box and UI Kitten Calendar component within the Popover component when focused.
 * Supports locales and different date objects like Moment.js or date-fns.
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
 * @property {D} date - Date which is currently selected.
 * Defaults to current date.
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
 * @property {boolean} boundingMonth - Defines if previous and next months should be rendered in the current month view.
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
 * @property {CalendarViewMode} startView - Defines starting view for calendar.
 * Can be `CalendarViewModes.DATE`, `CalendarViewModes.MONTH` or `CalendarViewModes.YEAR`.
 * Defaults to *CalendarViewModes.DATE*.
 *
 * @property {(date: D) => string} title - A function to transform selected date to a string displayed in header.
 *
 * @property {(date: D) => boolean} filter - A function to determine whether particular date cells should be disabled.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *basic*.
 * Useful for giving user a hint on the input validity.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {string} size - Size of the component.
 * Can be `small`, `medium` or `large`.
 * Defaults to *medium*.
 *
 * @property {ReactText | (TextProps) => ReactElement} placeholder - String, number or a function component
 * to render when input field is empty.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactText | (TextProps) => ReactElement} label - String, number or a function component
 * to render to top of the input field.
 * If it is a function, expected to return a Text.
 *
 * @property {(ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the text.
 * Expected to return an Image.
 *
 * @property {(ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the text.
 * Expected to return an Image.
 *
 * @property {ReactText | (TextProps) => ReactElement} caption - String, number or a function component
 * to render to bottom of the input field.
 * If it is a function, expected to return a Text.
 *
 * @property {(ImageProps) => ReactElement} captionIcon - Function component
 * to render to start of the *caption*.
 * Expected to return an Image.
 *
 * @property {() => void} onFocus - Called when picker becomes visible.
 *
 * @property {() => void} onBlur - Called when picker becomes invisible.
 *
 * @property {string | PopoverPlacement} placement - Position of the picker relative to the input field.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Defaults to *bottom*.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Style of backdrop.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example DatepickerSimpleUsage
 *
 * @overview-example DatepickerAccessories
 *
 * @overview-example DatepickerFilters
 *
 * @overview-example DatepickerLocaleSettings
 *
 * @overview-example DatepickerStatus
 *
 * @overview-example DatepickerSize
 *
 * @example DatepickerCustomDay
 *
 * @example DatepickerMoment
 *
 * @example DatepickerStyling
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
      renderMonth: this.props.renderMonth,
      renderYear: this.props.renderYear,
    };
  }

  // BaseDatepickerComponent

  protected getComponentTitle(): RenderProp<TextProps> | React.ReactText {
    if (this.props.date) {
      return this.props.dateService.format(this.props.date, null);
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
