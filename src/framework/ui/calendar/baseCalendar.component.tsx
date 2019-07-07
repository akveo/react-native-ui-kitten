/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  BaseScrollParams,
  List,
  ListComponent,
  ListProps,
  ScrollToIndexParams,
  ScrollToOffsetParams,
  ViewScrollParams,
} from '../list/list.component';
import {
  CalendarDay,
  CalendarDayElement,
  CalendarDayProps,
  CalendarMonth,
  CalendarMonthElement,
  CalendarMonthProps,
  CalendarWeekProps,
} from '../calendarKit/ui';
import {
  DateService,
  MonthModelService,
} from '../calendarKit/service';
import { range } from '../calendarKit/helpers';

type ListNoRenderItemProps = Omit<ListProps, 'renderItem'>;
type ListContainerProps = Omit<ListNoRenderItemProps, 'data'>;

export interface ScrollToDateParams<D> extends BaseScrollParams, ViewScrollParams {
  date: D;
}

export type ScrollToTodayParams<D> = Omit<ScrollToDateParams<D>, 'date'>;

interface ComponentProps<D> extends ListContainerProps {
  min: D;
  max: D;
  dateService: DateService<D>;
  date?: D;
  bounding?: boolean;
  filter?: (date: D) => boolean;
  onSelect?: (date: D) => void;
  renderItem: (date: D, style: StyleType) => React.ReactElement<any>;
  renderMonthHeader?: (date: D, style: StyleType) => React.ReactElement<any>;
}

export type BaseCalendarProps<D> = StyledComponentProps & ListContainerProps & ComponentProps<D>;
export type BaseCalendarElement<D> = React.ReactElement<BaseCalendarProps<D>>;

/**
 * Basic Calendar implementation. Styled by Eva Design System (Calendar).
 * Composes Calendar Kit components in a vertical list of calendar months.
 * Implements a basic logic on updating children to optimize performance.
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
 * @property {(date: D, style: StyleType) => ReactElement<any>} renderItem - Should return the content of day cell.
 *
 * @property {DateService<D>} dateService - Abstract Date Service that is able to work with a date objects.
 * Allows using different types of date like Moment.js or date-fns.
 *
 * @property {D} date - Date which is currently selected.
 *
 * @property {(date: D) => void} onSelect - Selection emitter. Fires when another day cell is pressed.
 *
 * @property {boolean} bounding - Defines if we should render previous and next months in the current month view.
 *
 * @property {(date: D, style: StyleType) => ReactElement<any>} renderMonthHeader - Should return the month header.
 *
 * @property {(date: D) => ReactElement<any>} filter - Predicate that decides which cells will be disabled.
 */

export class BaseCalendarComponent<D> extends React.Component<BaseCalendarProps<D>> {

  static styledComponentName: string = 'Calendar';

  private monthService: MonthModelService<D>;
  private listRef: React.RefObject<ListComponent> = React.createRef();
  private visibleMonth: D;

  private get dateService(): DateService<D> {
    return this.props.dateService;
  }

  constructor(props: BaseCalendarProps<D>) {
    super(props);
    this.monthService = new MonthModelService(props.dateService);
    this.visibleMonth = props.dateService.today();
  }

  public scrollToToday = (params?: ScrollToTodayParams<D>) => {
    const date: D = this.dateService.today();
    this.scrollToDate({ date, ...params });
  };

  public scrollToDate = (params: ScrollToDateParams<D>) => {
    const { date, ...restParams } = params;
    const index: number = this.getNumberOfMonthsInRange(this.props.min, date) - 1;
    this.scrollToIndex({ index, ...restParams });
  };

  public scrollToIndex = (params: ScrollToIndexParams) => {
    this.listRef.current.scrollToIndex(params);
  };

  public scrollToOffset = (params: ScrollToOffsetParams) => {
    this.listRef.current.scrollToOffset(params);
  };

  public scrollToEnd = (params?: BaseScrollParams) => {
    this.listRef.current.scrollToEnd(params);
  };

  private shouldUpdateMonth = (props: CalendarMonthProps<D>, nextProps: CalendarMonthProps<D>): boolean => {
    const wasSelected: boolean = this.dateService.isSameMonthSafe(props.selectedDate, props.date);
    const willSelected: boolean = this.dateService.isSameMonthSafe(nextProps.selectedDate, nextProps.date);

    return wasSelected || willSelected;
  };

  private shouldUpdateWeek = (props: CalendarWeekProps<D>, nextProps: CalendarWeekProps<D>): boolean => {
    const week: D[] = props.data.filter(Boolean);
    const { [0]: start, [week.length - 1]: end } = week;

    const wasSelected: boolean = this.dateService.isBetweenIncluding(props.selectedDate, start, end);
    const willSelected: boolean = this.dateService.isBetweenIncluding(nextProps.selectedDate, start, end);

    return wasSelected || willSelected;
  };

  private shouldUpdateDay = (props: CalendarDayProps<D>, nextProps: CalendarDayProps<D>): boolean => {
    const wasSelected: boolean = this.dateService.isSameDaySafe(props.selectedDate, props.date);
    const willSelected: boolean = this.dateService.isSameDaySafe(nextProps.selectedDate, nextProps.date);

    // TODO: theme comparison should be simplified
    return wasSelected || willSelected || props.theme !== nextProps.theme;
  };

  private getMonthHeaderStyle = (source: StyleType): StyleType => {
    return {
      container: {
        paddingHorizontal: source.monthHeaderPaddingHorizontal,
        paddingVertical: source.monthHeaderPaddingVertical,
        backgroundColor: source.monthHeaderBackgroundColor,
      },
      month: {
        fontSize: source.monthTextFontSize,
        fontWeight: source.monthTextFontWeight,
        lineHeight: source.monthTextLineHeight,
        color: source.monthTextColor,
      },
      weekday: {
        flex: 1,
        fontSize: source.weekdayTextFontSize,
        fontWeight: source.weekdayTextFontWeight,
        lineHeight: source.weekdayTextLineHeight,
        color: source.weekdayTextColor,
      },
    };
  };

  private getNumberOfMonthsInRange(start: D, end: D): number {
    const numberOfYears: number = this.dateService.getYear(end) - this.dateService.getYear(start);
    const numberOfMonths: number = numberOfYears * this.dateService.MONTHS_IN_YEAR;

    return numberOfMonths - (this.dateService.getMonth(start) - this.dateService.getMonth(end) - 1);
  }

  private onDaySelect = (date: D) => {
    if (this.props.onSelect) {
      this.props.onSelect(date);
    }
  };

  private isDayFitsFilter = (date: D): boolean => {
    return this.props.filter && !this.props.filter(date) || false;
  };

  private isDayFitsBounds = (date: D): boolean => {
    return this.dateService.isBetweenIncludingSafe(date, this.props.min, this.props.max);
  };

  private isDayDisabled = (date: D): boolean => {
    return !this.isDayFitsBounds(date) || this.isDayFitsFilter(date);
  };

  private isDaySelected = (date: D): boolean => {
    return this.dateService.isSameDaySafe(date, this.props.date);
  };

  private createMonthDate = (index: number): D => {
    return this.dateService.addMonth(this.props.min, index);
  };

  private createMonthData = (date: D): D[][] => {
    return this.monthService.createDaysGrid(date, this.props.bounding);
  };

  private createCalendarData = (min: D, max: D): D[] => {
    const numberOfMonths: number = this.getNumberOfMonthsInRange(min, max);

    return range(numberOfMonths, this.createMonthDate);
  };

  private renderDayElement = (item: D, index: number): CalendarDayElement<D> => {
    return (
      <CalendarDay
        key={index}
        date={item}
        selectedDate={this.props.date}
        selected={this.isDaySelected(item)}
        disabled={this.isDayDisabled(item)}
        onSelect={this.onDaySelect}
        shouldComponentUpdate={this.shouldUpdateDay}>
        {this.props.renderItem}
      </CalendarDay>
    );
  };

  private renderMonthElement = (info: ListRenderItemInfo<D>): CalendarMonthElement<D> => {
    const style: StyleType = this.getMonthHeaderStyle(this.props.themedStyle);

    return (
      <React.Fragment>
        {this.props.renderMonthHeader && this.props.renderMonthHeader(info.item, style)}
        <CalendarMonth
          data={this.createMonthData(info.item)}
          date={info.item}
          selectedDate={this.props.date}
          renderItem={this.renderDayElement}
          shouldComponentUpdate={this.shouldUpdateMonth}
          shouldUpdateWeek={this.shouldUpdateWeek}
        />
      </React.Fragment>
    );
  };

  public render(): React.ReactElement<ListProps> {
    const { style, themedStyle, min, max, dateService, ...restProps } = this.props;

    return (
      <List
        {...restProps}
        ref={this.listRef}
        style={[themedStyle, style]}
        initialNumToRender={dateService.MONTHS_IN_YEAR}
        data={this.createCalendarData(min, max)}
        renderItem={this.renderMonthElement}
      />
    );
  }
}

export const BaseCalendar = styled(BaseCalendarComponent);
