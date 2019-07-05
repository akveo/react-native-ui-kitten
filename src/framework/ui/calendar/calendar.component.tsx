/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { StyleType } from '@kitten/theme';
import {
  BaseCalendar,
  BaseCalendarComponent,
  BaseCalendarElement,
  BaseCalendarProps,
  ScrollToDateParams,
  ScrollToTodayParams,
} from './baseCalendar.component';
import {
  CalendarMonthHeader,
  CalendarMonthHeaderElement,
} from './calendarMonthHeader.component';
import {
  CalendarDayContent,
  CalendarDayContentElement,
} from './calendarDayContent.component';
import {
  BaseScrollParams,
  ScrollToIndexParams,
  ScrollToOffsetParams,
} from '../list/list.component';
import {
  DateService,
  NativeDateService,
} from '../calendarKit/service';
import { Override } from '../support/typings';

export type CalendarProps<D> = Override<BaseCalendarProps<D>, {
  renderItem?: (d: D, style: StyleType) => React.ReactElement<any>;
  dateService?: DateService<D>;
}>;

export type CalendarElement<D> = React.ReactElement<CalendarProps<D>>;

/**
 * Calendar component. Extends BaseCalendar implementation.
 *
 * WARNING: Experimental implementation. The future look of this component can be changed.
 *
 * Can be used with multiple date objects like Moment.js or date-fns with corresponding DateService.
 * Supports localization.
 * By default uses Native JS Date object.
 * Renders a vertical list of calendar months and default headers and day cells.
 *
 * @extends React.Component
 *
 * @method {(params: ScrollToTodayParams) => void} scrollToToday - Scrolls list to current date.
 *
 * @method {(params: ScrollToDateParams) => void} scrollToDate - Scrolls list to specified date.
 *
 * @method {(params: ScrollToIndexParams) => void} scrollToIndex - Scrolls list to specified month index.
 *
 * @method {(params: ScrollToOffsetParams) => void} scrollToOffset - Scrolls list to specified offset.
 *
 * @method {(params: BaseScrollParams) => void} scrollToEnd - Scrolls list to the end.
 *
 * @property {D} min - Minimal date that is able to be selected.
 *
 * @property {D} max - Maximum date that is able to be selected.
 *
 * @property {(date: D, style: StyleType) => ReactElement<any>} renderItem - Should return custom content of day cell.
 *
 * @property {(date: D, style: StyleType) => ReactElement<any>} renderMonthHeader - Should return custom month header.
 *
 * @property {DateService<D>} dateService - Abstract Date Service that is able to work with a date objects.
 * Allows using different types of date like Moment.js or date-fns. Default is Native Date Service that works
 * with native JS Date objects in English locale.
 *
 * @property {D} date - Date which is currently selected.
 *
 * @property {(date: D) => void} onSelect - Selection emitter. Fires when another day cell is pressed.
 *
 * @property {boolean} bounding - Defines if we should render previous and next months in the current month view.
 *
 * @example Basic Usage
 *
 * ```
 * import React from 'react';
 * import { Calendar } from 'react-native-ui-kitten';
 *
 * export class BasicCalendar extends React.Component {
 *   state = {
 *     date: new Date(),
 *   };
 *
 *   minDate = new Date(2019, 0, 1);
 *   maxDate = new Date(2019, 11, 1);
 *
 *   onSelect = (date) => {
 *     this.setState({ date });
 *   };
 *
 *   render() {
 *     return (
 *       <Calendar
 *         min={this.minDate}
 *         max={this.maxDate}
 *         date={this.state.date}
 *         onSelect={this.onSelect}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @example Custom Locale
 *
 * ```
 * import React from 'react';
 * import { Calendar, NativeDateService } from 'react-native-ui-kitten';
 *
 * export class GermanCalendar extends React.Component {
 *
 *   minDate = new Date(2019, 0, 1);
 *   maxDate = new Date(2019, 11, 1);
 *
 *   render() {
 *     return (
 *       <Calendar
 *         min={this.minDate}
 *         max={this.maxDate}
 *         dateService={new NativeDateService('de-DE')}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @example Custom Day Cell
 *
 * ```
 * import React from 'react';
 * import { Calendar, Layout, Text } from 'react-native-ui-kitten';
 *
 * export class DailyValueCalendar extends React.Component {
 *
 *   minDate = new Date(2019, 0, 1);
 *   maxDate = new Date(2019, 11, 1);
 *
 *   renderItem = (date, style) => {
 *     return (
 *       <Layout
 *         style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }, style.container]}>
 *         <Text style={style.text}>{`${date.getDate()}`}</Text>
 *         <Text style={style.text}>
 *           {`${100 * date.getDate() + Math.pow(date.getDate(), 2)}$`}
 *         </Text>
 *       </Layout>
 *     );
 *   };
 *
 *   render() {
 *     return (
 *       <Calendar
 *         min={this.minDate}
 *         max={this.maxDate}
 *         renderItem={this.renderItem}
 *       />
 *     );
 *   }
 * }
 * ```
 */

export class Calendar<D> extends React.Component<CalendarProps<D>> {

  static defaultProps = {
    bounding: false,
    dateService: new NativeDateService('en-US'),
  };

  private calendarRef: React.RefObject<BaseCalendarComponent<D>> = React.createRef();
  private dayOfWeekNames: string[] = this.props.dateService.getDayOfWeekNames();

  public scrollToToday = (params?: ScrollToTodayParams<D>) => {
    this.calendarRef.current.scrollToToday(params);
  };

  public scrollToDate = (params: ScrollToDateParams<D>) => {
    this.calendarRef.current.scrollToDate(params);
  };

  public scrollToIndex = (params: ScrollToIndexParams) => {
    this.calendarRef.current.scrollToIndex(params);
  };

  public scrollToOffset = (params: ScrollToOffsetParams) => {
    this.calendarRef.current.scrollToOffset(params);
  };

  public scrollToEnd = (params?: BaseScrollParams) => {
    this.calendarRef.current.scrollToEnd(params);
  };

  private renderDefaultMonthHeader = (date: D, style: StyleType): CalendarMonthHeaderElement => {
    const monthName: string = this.props.dateService.getMonthName(date);

    return (
      <CalendarMonthHeader
        style={style.container}
        nameStyle={style.month}
        weekdayStyle={style.weekday}
        name={monthName}
        weekdays={this.dayOfWeekNames}
      />
    );
  };

  private renderDefaultItem = (date: D, style: StyleType): CalendarDayContentElement => {
    return (
      <CalendarDayContent
        style={style.container}
        textStyle={style.text}>
        {`${this.props.dateService.getDate(date)}`}
      </CalendarDayContent>
    );
  };

  public render(): BaseCalendarElement<D> {
    return (
      <BaseCalendar
        ref={this.calendarRef}
        renderItem={this.renderDefaultItem}
        renderMonthHeader={this.renderDefaultMonthHeader}
        dateService={this.props.dateService}
        {...this.props}
      />
    );
  }
}
