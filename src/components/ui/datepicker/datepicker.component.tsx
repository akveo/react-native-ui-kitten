/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { DateService, NativeDateService } from '@ui-kitten/components';
import React from 'react';
import { RenderProp } from '../../devsupport';
import { styled } from '../../theme';
import {
  BaseDatepickerComponent,
  BaseDatepickerProps,
  BaseDatepickerRef,
} from './baseDatepicker.component';
import {
  Calendar,
  CalendarElement,
  CalendarProps,
  CalendarRef,
} from '../calendar/calendar.component';
import { TextProps } from '../text/text.component';

export interface DatepickerProps<D = Date> extends BaseDatepickerProps<D>, CalendarProps<D> {
  autoDismiss?: boolean;
}

export type DatepickerElement<D = Date> = React.ReactElement<DatepickerProps<D>>;

export type DatepickerRef<D = Date> = BaseDatepickerRef<D> & {
  clear: () => void;
};

/**
 * Date picker provides a simple way to select a date within a picker displayed in modal.
 *
 * @extends React.Component
 *
 * @method {() => void} focus - Focuses Datepicker and sets it visible.
 *
 * @method {() => void} blur - Removes focus from Datepicker and sets it invisible.
 *
 * @method {() => boolean} isFocused - Returns true if the Datepicker is currently focused and visible.
 *
 * @method {() => void} clear - Removes all text from the Datepicker.
 *
 * @method {() => void} scrollToToday - Show the current date in the picker, the picker should be visible.
 *
 * @method {(date: D) => void} scrollToDate - Show the specific date in the picker, the picker should be visible.
 *
 * @property {D} date - Date which is currently selected.
 * Defaults to current date.
 *
 * @property {D} initialVisibleDate - Specific date that should be shown on load.
 * If it is not set, the selected date or today's date will be displayed.
 * Clear initialVisibleDate to stop showing it when the datepicker is opened.
 *
 * @property {(D) => void} onSelect - Called when date cell is pressed.
 *
 * @property {boolean} autoDismiss - Will hide the calendar when date cell is pressed.
 * Defaults to *true*.
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
 * @property {(D, D, CalendarViewMode) => string} title - A function to transform visible date to a string displayed in
 * header for the specific view mode: first date is date picker, second date is year and month picker.
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
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} placeholder - String, number or a function
 * component to render when input field is empty.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} label - String, number or a function component
 * to render to top of the input field.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the text.
 * Expected to return an Image.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the text.
 * Expected to return an Image.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} caption - Function component to render below
 * Input view.
 * Expected to return View.
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
 * @property {ComponentType | null} renderArrowLeft - Custom component which will be used
 * to render left arrow inside header instead of default one. Custom component must invoke onPress method from
 * props to keep calendar navigation functionality.
 *
 * @property {ComponentType | null} renderArrowRight - Custom component which will be used
 * to render right arrow inside header instead of default one. Custom component must invoke onPress method from
 * props to keep calendar navigation functionality.
 *
 * @property {(D, CalendarViewMode) => void} onVisibleDateChange - Called when navigating to the previous
 * or next month / year. viewMode returns string with current calendar view ("YEAR", "MONTH", "DATE").
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example DatepickerSimpleUsage
 * Both range and date pickers support all parameters as calendar, so, check Calendar API for additional info.
 *
 * @overview-example DatepickerAccessories
 * Pickers may contain labels, captions and inner views by configuring `accessoryLeft` or `accessoryRight` properties.
 * Within Eva, Datepicker accessories are expected to be images or [svg icons](guides/icon-packages).
 *
 * @overview-example DatepickerInitialVisibleDate
 * Calendar can show specified date on render.
 * Also, it is possible to use scrollToToday and scrollToDate to show specific dates.
 *
 * @overview-example DatepickerFilters
 * Picker may accept minimal and maximum dates, filter functions, and `boundingMonth` property,
 * which disables displaying previous month dates at the current date view.
 *
 * @overview-example DatepickerLocaleSettings
 * Also, it is possible to setup locale by configuring Date Service.
 *
 * @overview-example DatepickerStatus
 * Datepicker may be marked with `status` property, which is useful within forms validation.
 * An extra status is `control`, which is designed to be used on high-contrast backgrounds.
 *
 * @overview-example DatepickerSize
 * To resize Datepicker, a `size` property may be used.
 *
 * @overview-example DatepickerMoment
 * Datepicker is able to work with Moment, by configuring date service.
 * In order to use Moment, `@ui-kitten/moment` package is required.
 *
 * @overview-example DatepickerCustomDay
 * To render custom cells, `renderDay`, `renderMonth` and `renderYear` properties may be used.
 *
 * @overview-example DatepickerStyling
 * Datepicker and it's inner views can be styled by passing them as function components.
 * ```
 * import { Datepicker, Text } '@ui-kitten/components';
 *
 * <Datepicker
 *   controlStyle={{ ... }}
 *   label={evaProps => <Text {...evaProps}>Label</Text>}
 *   caption={evaProps => <Text {...evaProps}>Caption</Text>}
 * />
 * ```
 *
 * @overview-example DatepickerTheming
 * In most cases this is redundant, if [custom theme is configured](guides/branding).
 */
function Datepicker<D = Date>(
  {
    autoDismiss = true,
    placeholder = 'dd/mm/yyyy',
    ...props
  }: DatepickerProps<D>,
  ref: React.RefObject<DatepickerRef<D>>
): React.ReactElement<DatepickerProps<D>> {
  const calendarRef = React.useRef<CalendarRef<D>>(null);
  const baseDatepickerRef = React.useRef<BaseDatepickerRef<D>>(null);
  const dateService = props.dateService ?? new NativeDateService() as unknown as DateService<D>;

  React.useImperativeHandle(ref, () => ({
    focus: baseDatepickerRef.current?.focus,
    blur: baseDatepickerRef.current?.blur,
    isFocused: baseDatepickerRef.current?.isFocused,
    scrollToToday: calendarRef.current?.scrollToToday,
    scrollToDate: calendarRef.current?.scrollToDate,
    state: calendarRef.current?.state,
    dataService: calendarRef.current?.dataService,
    clear,
  }));

  const calendarProps: CalendarProps<D> = ({
    dateService,
    min: props.min,
    max: props.max,
    date: props.date,
    initialVisibleDate: props.initialVisibleDate,
    boundingMonth: props.boundingMonth,
    startView: props.startView,
    filter: props.filter,
    title: props.title,
    onSelect: props.onSelect,
    renderDay: props.renderDay,
    renderMonth: props.renderMonth,
    renderYear: props.renderYear,
    renderFooter: props.renderFooter,
    renderArrowRight: props.renderArrowRight,
    renderArrowLeft: props.renderArrowLeft,
    onVisibleDateChange: props.onVisibleDateChange,
  });

  const clear = (): void => {
    if (props.onSelect) {
      props.onSelect(null);
    }
  };

  // BaseDatepickerComponent

  const getComponentTitle = (): RenderProp<TextProps> | string | number => {
    if (props.date) {
      return dateService.format(props.date, null);
    } else {
      return placeholder;
    }
  };

  const onSelect = (date: D): void => {
    props.onSelect?.(date);
    autoDismiss && baseDatepickerRef.current?.blur?.();
  };

  const renderCalendar = (): CalendarElement<D> => {
    return (
      <Calendar
        ref={calendarRef}
        {...calendarProps}
        onSelect={onSelect}
      />
    );
  };

  return (
    <BaseDatepickerComponent
      {...props}
      dateService={dateService}
      placeholder={placeholder}
      ref={baseDatepickerRef}
      renderCalendar={renderCalendar}
      getComponentTitle={getComponentTitle}
      clear={clear}
    />
  );
}

const Component = styled('Datepicker')(React.forwardRef(Datepicker));

export {
  Component as Datepicker,
};
