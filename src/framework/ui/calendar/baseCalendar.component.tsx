/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { StyleType } from '@kitten/theme';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  CalendarHeader,
  CalendarHeaderElement,
} from './components/calendarHeader.component';
import { CalendarMonthHeader } from './components/calendarMonthHeader.component';
import {
  CalendarPager,
  CalendarPagerElement,
} from './components/calendarPager.component';
import {
  CalendarPicker,
  CalendarPickerElement,
} from './components/picker/calendarPicker.component';
import { CalendarPickerCellProps } from './components/picker/calendarPickerCell.component';
import {
  CalendarDateContent,
  CalendarDateContentElement,
} from './components/calendarDateContent.component';
import {
  CalendarDateInfo,
  CalendarViewMode,
  CalendarViewModes,
} from './type';
import { DateService } from './service/date.service';
import { NativeDateService } from './service/nativeDate.service';
import {
  CalendarDataService,
  DateBatch,
} from './service/calendarData.service';
import { Divider } from '../divider/divider.component';

export interface BaseCalendarProps<D> extends ViewProps {
  min?: D;
  max?: D;
  dateService?: DateService<D>;
  boundingMonth?: boolean;
  startView?: CalendarViewMode;
  title?: (date: D, viewMode: CalendarViewMode) => string;
  todayTitle?: (date: D) => string;
  filter?: (date: D) => boolean;
  renderFooter?: () => React.ReactElement<any>;
  renderDay?: (info: CalendarDateInfo<D>, style: StyleType) => React.ReactElement<any>;
  renderMonth?: (info: CalendarDateInfo<D>, style: StyleType) => React.ReactElement<any>;
  renderYear?: (info: CalendarDateInfo<D>, style: StyleType) => React.ReactElement<any>;
  themedStyle?: StyleType;
}

interface State<D> {
  viewMode: CalendarViewMode;
  visibleDate: D;
}

export type BaseCalendarElement<D> = React.ReactElement<BaseCalendarProps<D>>;

const PICKER_ROWS: number = 4;
const PICKER_COLUMNS: number = 3;
const VIEWS_IN_PICKER: number = PICKER_ROWS * PICKER_COLUMNS;

const FORMAT_DAY: string = 'D';
const FORMAT_MONTH: string = 'MMM';
const FORMAT_YEAR: string = 'YYYY';
const FORMAT_HEADER_DATE: string = 'MMM YYYY';
const FORMAT_HEADER_MONTH: string = 'YYYY';
const FORMAT_HEADER_YEAR: string = 'YYYY';

export abstract class BaseCalendarComponent<D, P> extends React.Component<BaseCalendarProps<D> & P, State<D>> {

  static defaultProps = {
    dateService: new NativeDateService(),
    boundingMonth: true,
    startView: CalendarViewModes.DATE,
  };

  public state: State<D> = {
    viewMode: this.props.startView,
    visibleDate: this.dateService.getMonthStart(this.getSelectedDate()),
  };

  protected abstract onDaySelect(item: any): void;

  protected abstract isDaySelected(date: CalendarDateInfo<D>): boolean;

  protected abstract getSelectedDate(): D;

  protected abstract getDayPickerData(date: CalendarDateInfo<D>): DateBatch<D>;

  protected abstract shouldUpdateDayElement(props: CalendarPickerCellProps<D>,
                                            nextProps: CalendarPickerCellProps<D>): boolean;

  protected dataService: CalendarDataService<D> = new CalendarDataService(this.dateService);

  protected get dateService(): DateService<D> {
    return this.props.dateService;
  }

  private get min(): D {
    return this.props.min || this.dateService.getYearStart(this.dateService.today());
  }

  private get max(): D {
    return this.props.max || this.dateService.getYearEnd(this.dateService.today());
  }

  private calendarDayPagerRef: React.RefObject<CalendarPager<D>> = React.createRef();
  private calendarYearPagerRef: React.RefObject<CalendarPager<D>> = React.createRef();

  public scrollToToday = (): void => {
    this.setState({
      viewMode: CalendarViewModes.DATE,
      visibleDate: this.dateService.today(),
    });
  };

  private onSelect = (item: CalendarDateInfo<D>): void => {
    this.onDaySelect(item);
  };

  private onMonthSelect = (date: CalendarDateInfo<D>): void => {
    const nextVisibleDate: D = this.dateService.createDate(
      this.dateService.getYear(this.state.visibleDate),
      this.dateService.getMonth(date.date),
      this.dateService.getDate(this.state.visibleDate),
    );

    this.setState({
      viewMode: this.state.viewMode.pickNext(),
      visibleDate: nextVisibleDate,
    });
  };

  private onYearSelect = (date: CalendarDateInfo<D>): void => {
    const nextVisibleDate: D = this.dateService.createDate(
      this.dateService.getYear(date.date),
      this.dateService.getMonth(this.state.visibleDate),
      this.dateService.getDate(this.state.visibleDate),
    );

    this.setState({
      viewMode: this.state.viewMode.pickNext(),
      visibleDate: nextVisibleDate,
    });
  };

  private onDayPickerPagerSelect = (index: number): void => {
    this.setState({
      visibleDate: this.dateService.addMonth(this.min, index),
    });
  };

  private onYearPickerPagerSelect = (index: number): void => {
    const yearStart: D = this.dateService.getYearStart(this.min);
    this.setState({
      visibleDate: this.dateService.addYear(yearStart, index * VIEWS_IN_PICKER),
    });
  };

  private onPickerNavigationPress = (): void => {
    this.setState({
      viewMode: this.state.viewMode.navigationNext(),
    });
  };

  private onHeaderNavigationLeftPress = (): void => {
    const pagerRef: React.RefObject<CalendarPager<D>> = this.getCurrentPagerRef();

    pagerRef.current.scrollToIndex({
      index: pagerRef.current.props.selectedIndex - 1,
      animated: true,
    });
  };

  private onHeaderNavigationRightPress = (): void => {
    const pagerRef: React.RefObject<CalendarPager<D>> = this.getCurrentPagerRef();

    pagerRef.current.scrollToIndex({
      index: pagerRef.current.props.selectedIndex + 1,
      animated: true,
    });
  };

  private shouldUpdateDayItem = (props: CalendarPickerCellProps<D>,
                                 nextProps: CalendarPickerCellProps<D>): boolean => {

    return this.shouldUpdateDayElement(props, nextProps);
  };

  public getCalendarStyle = (source: StyleType): StyleType => {
    return {
      container: {
        paddingVertical: source.paddingVertical,
        borderColor: source.borderColor,
        borderWidth: source.borderWidth,
        borderRadius: source.borderRadius,
        maxWidth: source.maxWidth,
        maxHeight: source.maxHeight,
      },
      headerContainer: {
        paddingHorizontal: source.headerPaddingHorizontal,
        paddingVertical: source.headerPaddingVertical,
      },
      title: {
        fontSize: source.titleFontSize,
        fontWeight: source.titleFontWeight,
        lineHeight: source.titleLineHeight,
        color: source.titleColor,
        fontFamily: source.titleFontFamily,
      },
      icon: {
        width: source.iconWidth,
        height: source.iconHeight,
        tintColor: source.iconTintColor,
      },
      divider: {
        marginVertical: source.dividerMarginVertical,
      },
      daysHeaderContainer: {
        marginHorizontal: source.rowMarginHorizontal,
      },
      row: {
        minHeight: source.rowMinHeight,
        marginHorizontal: source.rowMarginHorizontal,
      },
    };
  };

  private getWeekdayStyle = (source: StyleType): StyleType => {
    return {
      fontSize: source.weekdayTextFontSize,
      fontWeight: source.weekdayTextFontWeight,
      lineHeight: source.weekdayTextLineHeight,
      color: source.weekdayTextColor,
      fontFamily: source.weekdayTextFontFamily,
    };
  };

  private getIsDaySelected = (date: CalendarDateInfo<D>): boolean => {
    return this.isDaySelected(date);
  };

  private isMonthSelected = (date: CalendarDateInfo<D>): boolean => {
    return this.dateService.isSameMonthSafe(date.date, this.getSelectedDate());
  };

  private isYearSelected = (date: CalendarDateInfo<D>): boolean => {
    return this.dateService.isSameYearSafe(date.date, this.getSelectedDate());
  };

  public isDayDisabled = (date: CalendarDateInfo<D>): boolean => {
    const minDayStart: D = this.dateService.createDate(
      this.dateService.getYear(this.min),
      this.dateService.getMonth(this.min),
      this.dateService.getDate(this.min),
    );

    const maxDayStart: D = this.dateService.createDate(
      this.dateService.getYear(this.max),
      this.dateService.getMonth(this.max),
      this.dateService.getDate(this.max),
    );

    return !this.dateService.isBetweenIncludingSafe(date.date, minDayStart, maxDayStart) || this.isDateFitsFilter(date);
  };

  private isMonthDisabled = (date: CalendarDateInfo<D>): boolean => {
    const minMonthStart: D = this.dateService.getMonthStart(this.min);
    const maxMonthStart: D = this.dateService.getMonthStart(this.max);

    return !this.dateService.isBetweenIncludingSafe(date.date, minMonthStart, maxMonthStart);
  };

  private isYearDisabled = (date: CalendarDateInfo<D>): boolean => {
    const minYearStart: D = this.dateService.getYearStart(this.min);
    const maxYearStart: D = this.dateService.getYearEnd(this.max);

    return !this.dateService.isBetweenIncludingSafe(date.date, minYearStart, maxYearStart);
  };

  public isDayToday = (date: CalendarDateInfo<D>): boolean => {
    return this.dateService.isSameDaySafe(date.date, this.dateService.today());
  };

  private isMonthToday = (date: CalendarDateInfo<D>): boolean => {
    return this.dateService.isSameMonthSafe(date.date, this.dateService.today());
  };

  private isYearToday = (date: CalendarDateInfo<D>): boolean => {
    return this.dateService.isSameYearSafe(date.date, this.dateService.today());
  };

  private isDateFitsFilter = (date: CalendarDateInfo<D>): boolean => {
    return this.props.filter && !this.props.filter(date.date) || false;
  };

  private isDateFitsBounds = (date: CalendarDateInfo<D>): boolean => {
    return this.dateService.isBetweenIncludingSafe(date.date, this.min, this.max);
  };

  private isDayPickerInViewPort = (index: number): boolean => {
    const visibleDayPickerIndex: number = this.dataService.getNumberOfMonths(this.min, this.state.visibleDate);

    return index === visibleDayPickerIndex || Math.abs(index - visibleDayPickerIndex) === 1;
  };

  private isYearPickerInViewPort = (index: number): boolean => {
    const numberOfYears: number = this.dataService.getNumberOfYears(this.min, this.state.visibleDate);
    const visibleYearPickerIndex: number = Math.floor(numberOfYears / VIEWS_IN_PICKER);

    return index === visibleYearPickerIndex || Math.abs(index - visibleYearPickerIndex) === 1;
  };

  private createHeaderTitle = (date: D, viewMode: CalendarViewMode): string => {
    switch (viewMode) {
      case CalendarViewModes.DATE:
        return this.dateService.format(date, FORMAT_HEADER_DATE);
      case CalendarViewModes.MONTH: {
        return this.dateService.format(date, FORMAT_HEADER_MONTH);
      }
      case CalendarViewModes.YEAR: {
        const minDateFormat: string = this.dateService.format(this.min, FORMAT_HEADER_YEAR);
        const maxDateFormat: string = this.dateService.format(this.max, FORMAT_HEADER_YEAR);

        return `${minDateFormat} - ${maxDateFormat}`;
      }
    }
  };

  private getCalendarPagerIndex = (): number => {
    switch (this.state.viewMode.id) {
      case CalendarViewModes.DATE.id:
        return this.dataService.getNumberOfMonths(this.min, this.state.visibleDate);
      case CalendarViewModes.YEAR.id:
        return Math.floor(this.dataService.getNumberOfYears(this.min, this.state.visibleDate) / VIEWS_IN_PICKER);
    }
  };

  private getCurrentPagerRef = (): React.RefObject<CalendarPager<D>> => {
    switch (this.state.viewMode.id) {
      case CalendarViewModes.DATE.id:
        return this.calendarDayPagerRef;
      case CalendarViewModes.YEAR.id:
        return this.calendarYearPagerRef;
    }
  };

  private isLateralNavigationAllowed = (): boolean => {
    return this.state.viewMode.id === CalendarViewModes.DATE.id || this.state.viewMode.id === CalendarViewModes.YEAR.id;
  };

  private renderWeekdayElement = (weekday: string, index: number): CalendarDateContentElement => {
    return (
      <CalendarDateContent
        key={index}
        textStyle={this.getWeekdayStyle(this.props.themedStyle)}>
        {weekday}
      </CalendarDateContent>
    );
  };

  private renderDayElement = (date: CalendarDateInfo<D>, style: StyleType): CalendarDateContentElement => {
    return (
      <CalendarDateContent
        style={style.container}
        textStyle={style.text}>
        {this.dateService.format(date.date, FORMAT_DAY)}
      </CalendarDateContent>
    );
  };

  private renderDayIfNeeded = (item: CalendarDateInfo<D>, style: StyleType): CalendarDateContentElement => {
    const shouldRender: boolean = !item.bounding || this.props.boundingMonth;

    if (shouldRender) {
      const renderSelector = this.props.renderDay || this.renderDayElement;
      return renderSelector(item, style);
    }

    return null;
  };

  private renderMonthElement = (date: CalendarDateInfo<D>, style: StyleType): CalendarDateContentElement => {
    return (
      <CalendarDateContent
        style={[style.container, styles.monthCell]}
        textStyle={style.text}>
        {this.dateService.format(date.date, FORMAT_MONTH)}
      </CalendarDateContent>
    );
  };

  private renderYearElement = (date: CalendarDateInfo<D>, style: StyleType): CalendarDateContentElement => {
    return (
      <CalendarDateContent
        style={[style.container, styles.yearCell]}
        textStyle={style.text}>
        {this.dateService.format(date.date, FORMAT_YEAR)}
      </CalendarDateContent>
    );
  };

  private renderDayPickerElement = (date: CalendarDateInfo<D>, index: number): CalendarPickerElement<D> => {
    const { row } = this.getCalendarStyle(this.props.themedStyle);

    return (
      <CalendarPicker
        key={index}
        category='day'
        data={this.getDayPickerData(date)}
        rowStyle={row}
        onSelect={this.onSelect}
        isItemSelected={this.getIsDaySelected}
        isItemDisabled={this.isDayDisabled}
        isItemToday={this.isDayToday}
        shouldItemUpdate={this.shouldUpdateDayItem}
        renderItem={this.renderDayIfNeeded}
      />
    );
  };

  private renderDayPickerPagerElement = (date: D): React.ReactFragment => {
    const { divider, daysHeaderContainer } = this.getCalendarStyle(this.props.themedStyle);
    const visibleDayPickerIndex: number = this.dataService.getNumberOfMonths(this.min, this.state.visibleDate);

    return (
      <React.Fragment>
        <CalendarMonthHeader
          style={daysHeaderContainer}
          data={this.dateService.getDayOfWeekNames()}>
          {this.renderWeekdayElement}
        </CalendarMonthHeader>
        <Divider style={divider}/>
        <CalendarPager
          ref={this.calendarDayPagerRef}
          selectedIndex={visibleDayPickerIndex}
          data={this.dataService.createDayPickerPagerData(this.min, this.max)}
          onSelect={this.onDayPickerPagerSelect}
          shouldLoadComponent={this.isDayPickerInViewPort}>
          {this.renderDayPickerElement}
        </CalendarPager>
      </React.Fragment>
    );
  };

  private renderMonthPickerElement = (date: D): CalendarPagerElement<D> => {
    const { row } = this.getCalendarStyle(this.props.themedStyle);

    return (
      <CalendarPicker
        category='month'
        data={this.dataService.createMonthPickerData(date, PICKER_ROWS, PICKER_COLUMNS)}
        rowStyle={row}
        onSelect={this.onMonthSelect}
        isItemSelected={this.isMonthSelected}
        isItemDisabled={this.isMonthDisabled}
        isItemToday={this.isMonthToday}
        renderItem={this.props.renderMonth || this.renderMonthElement}
      />
    );
  };

  private renderYearPickerElement = (date: CalendarDateInfo<D>, index: number): React.ReactElement<ViewProps> => {
    const { row } = this.getCalendarStyle(this.props.themedStyle);

    return (
      <CalendarPicker
        key={index}
        category='year'
        data={this.dataService.createYearPickerData(date.date, PICKER_ROWS, PICKER_COLUMNS)}
        rowStyle={row}
        onSelect={this.onYearSelect}
        isItemSelected={this.isYearSelected}
        isItemDisabled={this.isYearDisabled}
        isItemToday={this.isYearToday}
        renderItem={this.props.renderYear || this.renderYearElement}
      />
    );
  };

  private renderYearPickerPagerElement = (date: D): CalendarPagerElement<D> => {
    const numberOfYears: number = this.dataService.getNumberOfYears(this.min, this.state.visibleDate);
    const visibleYearPickerIndex: number = Math.floor(numberOfYears / VIEWS_IN_PICKER);

    return (
      <CalendarPager
        ref={this.calendarYearPagerRef}
        selectedIndex={visibleYearPickerIndex}
        data={this.dataService.createYearPickerPagerData(this.min, this.max, PICKER_ROWS, PICKER_COLUMNS)}
        onSelect={this.onYearPickerPagerSelect}
        shouldLoadComponent={this.isYearPickerInViewPort}>
        {this.renderYearPickerElement}
      </CalendarPager>
    );
  };

  private renderPickerElement = (date: D): React.ReactNode => {
    switch (this.state.viewMode.id) {
      case CalendarViewModes.DATE.id:
        return this.renderDayPickerPagerElement(date);
      case CalendarViewModes.MONTH.id:
        return this.renderMonthPickerElement(date);
      case CalendarViewModes.YEAR.id:
        return this.renderYearPickerPagerElement(date);
    }
  };

  private renderCalendarFooter = (): React.ReactElement<any> => {
    if (this.props.renderFooter) {
      return this.props.renderFooter();
    }
    return null;
  };

  private renderCalendarHeader = (): CalendarHeaderElement => {
    const { headerContainer, title: titleStyle, icon } = this.getCalendarStyle(this.props.themedStyle);
    const titleSelector = this.props.title || this.createHeaderTitle;

    return (
      <CalendarHeader
        style={headerContainer}
        title={titleSelector(this.state.visibleDate, this.state.viewMode)}
        titleStyle={titleStyle}
        iconStyle={icon}
        lateralNavigationAllowed={this.isLateralNavigationAllowed()}
        onTitlePress={this.onPickerNavigationPress}
        onNavigationLeftPress={this.onHeaderNavigationLeftPress}
        onNavigationRightPress={this.onHeaderNavigationRightPress}
      />
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, themedStyle, ...restProps } = this.props;
    const { container } = this.getCalendarStyle(themedStyle);

    return (
      <View
        {...restProps}
        style={[styles.container, container, style]}>
        {this.renderCalendarHeader()}
        {this.renderPickerElement(this.state.visibleDate)}
        {this.renderCalendarFooter()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  monthCell: {
    aspectRatio: 0.25 * DateService.DAYS_IN_WEEK,
  },
  yearCell: {
    aspectRatio: 0.25 * DateService.DAYS_IN_WEEK,
  },
});
