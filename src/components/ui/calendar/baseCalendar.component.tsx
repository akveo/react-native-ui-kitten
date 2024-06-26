/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  EvaProp,
  StyleType,
} from '../../theme';
import { Divider } from '../divider/divider.component';
import {
  CalendarHeader,
  CalendarHeaderElement,
} from './components/calendarHeader.component';
import { CalendarMonthHeader } from './components/calendarMonthHeader.component';
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
  CalendarViewModeId,
} from './type';
import { TranslationWidth } from './i18n/type';
import { DateService } from './service/date.service';
import {
  CalendarDataService,
  DateBatch,
} from './service/calendarData.service';

export interface DerivedCalendarProps<D = Date> extends BaseCalendarProps<D> {
  createDates: (date: D) => DateBatch<D>;
  selectedDate: () => D | undefined;
  onDateSelect: (item: D) => void;
  isDateSelected: (date: D) => boolean;
  shouldUpdateDate: (props: CalendarPickerCellProps<D>, nextProps: CalendarPickerCellProps<D>) => boolean;
}

export interface BaseCalendarProps<D = Date> extends ViewProps {
  min?: D;
  max?: D;
  initialVisibleDate?: D;
  dateService?: DateService<D>;
  boundingMonth?: boolean;
  startView?: CalendarViewMode;
  title?: (datePickerDate: D, monthYearPickerDate: D, viewMode: CalendarViewMode) => string;
  filter?: (date: D) => boolean;
  renderFooter?: () => React.ReactElement;
  renderDay?: (info: CalendarDateInfo<D>, style: StyleType) => React.ReactElement;
  renderMonth?: (info: CalendarDateInfo<D>, style: StyleType) => React.ReactElement;
  renderYear?: (info: CalendarDateInfo<D>, style: StyleType) => React.ReactElement;
  renderArrowLeft?: React.ComponentType<{ onPress: () => void }> | null;
  renderArrowRight?: React.ComponentType<{ onPress: () => void }> | null;
  onVisibleDateChange?: (date: D, viewModeId: CalendarViewModeId) => void;
  eva?: EvaProp;
}

export type BaseCalendarElement<D = Date> = React.ReactElement<DerivedCalendarProps<D>>;

const PICKER_ROWS = 4;
const PICKER_COLUMNS = 3;
const VIEWS_IN_PICKER: number = PICKER_ROWS * PICKER_COLUMNS;

export interface BaseCalendarRef<D = Date> {
  scrollToToday: () => void;
  scrollToDate: (date: D) => void;
  dataService: CalendarDataService<D>;
  state: State<D>;
}

interface State<D> {
  viewMode: CalendarViewMode;
  visibleDate: D;
  pickerDate: D;
}

function BaseCalendarComponent<D = Date>(
  {
    dateService,
    boundingMonth = true,
    startView = CalendarViewModes.DATE,
    ...props
  }: DerivedCalendarProps<D>,
  ref: React.RefObject<BaseCalendarRef<D>>
): BaseCalendarElement<D> {
  if (!dateService) {
    throw Error('No dateService');
  }
  const dataService: CalendarDataService<D> = new CalendarDataService(dateService);
  const [viewMode, setViewMode] = React.useState<CalendarViewMode>(startView);


  console.log('base current ref', ref.current);

  const initialVisibleDate = (): D => {
    return props.initialVisibleDate || props.selectedDate() || dateService.today();
  };

  // is used in date view mode
  const [
    visibleDate,
    setVisibleDate,
  ] = React.useState(dateService.getMonthStart(initialVisibleDate()));

  // is used in month/year view mode, goal - not to change visibleDate until month has changed
  const [pickerDate, setPickerDate,
  ] = React.useState(dateService.getMonthStart(initialVisibleDate()));

  // pickerDate equals to visibleDate from start
  // is auto synchronised with visibleDate on onPickerNavigationPress (open/close month/year picker)
  // visibleDate is set to pickerDate on onMonthSelect

  const min = (): D => {
    return props.min || dateService.getYearStart(dateService.today());
  };

  const max = (): D => {
    return props.max || dateService.getYearEnd(dateService.today());
  };

  React.useImperativeHandle(ref, () => ({
    scrollToToday,
    scrollToDate,
    dataService,
    state: {
      viewMode,
      visibleDate,
      pickerDate,
    },
  }));

  const scrollToToday = (): void => {
    setViewMode(CalendarViewModes.DATE);
    setVisibleDate(dateService.today());
    setPickerDate(dateService.today());
  };

  const scrollToDate = (date: D): void => {
    if (date) {
      setViewMode(CalendarViewModes.DATE);
      setVisibleDate(date);
      setPickerDate(date);
    }
  };

  const getCalendarStyle = (source: StyleType): StyleType => {
    return {
      container: {
        width: source.width,
        paddingVertical: source.paddingVertical,
        borderColor: source.borderColor,
        borderWidth: source.borderWidth,
        borderRadius: source.borderRadius,
      },
      headerContainer: {
        paddingHorizontal: source.headerPaddingHorizontal,
        paddingVertical: source.headerPaddingVertical,
      },
      title: {
        fontSize: source.titleFontSize,
        fontWeight: source.titleFontWeight,
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

  const isDayDisabled = ({ date }: CalendarDateInfo<D>): boolean => {
    const minDayStart: D = dateService.createDate(
      dateService.getYear(min()),
      dateService.getMonth(min()),
      dateService.getDate(min()),
    );

    const maxDayStart: D = dateService.createDate(
      dateService.getYear(max()),
      dateService.getMonth(max()),
      dateService.getDate(max()),
    );

    const fitsFilter: boolean = props.filter && !props.filter(date) || false;

    return !dateService.isBetweenIncludingSafe(date, minDayStart, maxDayStart) || fitsFilter;
  };

  const isDayToday = ({ date }: CalendarDateInfo<D>): boolean => {
    return dateService.isSameDaySafe(date, dateService.today());
  };

  const onDaySelect = ({ date }: CalendarDateInfo<D>): void => {
    props.onDateSelect(date);
  };

  const onMonthSelect = ({ date }: CalendarDateInfo<D>): void => {
    const nextVisibleDate: D = dateService.createDate(
      dateService.getYear(pickerDate),
      dateService.getMonth(date),
      dateService.getDate(pickerDate),
    );

    setViewMode(viewMode.pickNext());
    setVisibleDate(nextVisibleDate);
    setPickerDate(nextVisibleDate);
    props.onVisibleDateChange?.(nextVisibleDate, viewMode.id);
  };

  const onYearSelect = ({ date }: CalendarDateInfo<D>): void => {
    const nextVisibleDate: D = dateService.createDate(
      dateService.getYear(date),
      dateService.getMonth(pickerDate),
      dateService.getDate(pickerDate),
    );

    setViewMode(viewMode.pickNext());
    setPickerDate(nextVisibleDate);
  };

  const onPickerNavigationPress = (): void => {
    setViewMode(viewMode.navigationNext());
    setPickerDate(visibleDate);
  };

  const onHeaderNavigationLeftPress = (): void => {
    const nextDate = createViewModeVisibleDate(-1);

    if (viewMode.id === CalendarViewModes.DATE.id) {
      setVisibleDate(nextDate);
      props.onVisibleDateChange?.(visibleDate, viewMode.id);
    } else {
      setPickerDate(nextDate);
    }
  };

  const onHeaderNavigationRightPress = (): void => {
    const nextDate = createViewModeVisibleDate(1);

    if (viewMode.id === CalendarViewModes.DATE.id) {
      setVisibleDate(nextDate);
      props.onVisibleDateChange?.(visibleDate, viewMode.id);
    } else {
      setPickerDate(nextDate);
    }
  };

  const getWeekdayStyle = (source: StyleType): StyleType => {
    return {
      fontSize: source.weekdayTextFontSize,
      fontWeight: source.weekdayTextFontWeight,
      color: source.weekdayTextColor,
      fontFamily: source.weekdayTextFontFamily,
    };
  };

  const isDaySelected = ({ date }: CalendarDateInfo<D>): boolean => {
    return props.isDateSelected(date);
  };

  const isMonthSelected = ({ date }: CalendarDateInfo<D>): boolean => {
    return dateService.isSameMonthSafe(date, props.selectedDate());
  };

  const isYearSelected = ({ date }: CalendarDateInfo<D>): boolean => {
    return dateService.isSameYearSafe(date, props.selectedDate());
  };

  const isMonthDisabled = ({ date }: CalendarDateInfo<D>): boolean => {
    const minMonthStart: D = dateService.getMonthStart(min());
    const maxMonthStart: D = dateService.getMonthStart(max());

    return !dateService.isBetweenIncludingSafe(date, minMonthStart, maxMonthStart);
  };

  const isYearDisabled = ({ date }: CalendarDateInfo<D>): boolean => {
    const minYearStart: D = dateService.getYearStart(min());
    const maxYearStart: D = dateService.getYearEnd(max());

    return !dateService.isBetweenIncludingSafe(date, minYearStart, maxYearStart);
  };

  const isMonthToday = (date: CalendarDateInfo<D>): boolean => {
    return dateService.isSameMonthSafe(date.date, dateService.today());
  };

  const isYearToday = ({ date }: CalendarDateInfo<D>): boolean => {
    return dateService.isSameYearSafe(date, dateService.today());
  };

  const isHeaderNavigationAllowed = (): boolean => {
    return viewMode.id !== CalendarViewModes.MONTH.id;
  };

  const createViewModeVisibleDate = (page: number): D => {
    switch (viewMode.id) {
      case CalendarViewModes.DATE.id: {
        return dateService.addMonth(visibleDate, page);
      }
      case CalendarViewModes.MONTH.id: {
        return dateService.addYear(pickerDate, page);
      }
      case CalendarViewModes.YEAR.id: {
        return dateService.addYear(pickerDate, VIEWS_IN_PICKER * page);
      }
      default: return;
    }
  };

  const createViewModeHeaderTitle = (newVisibleDate: D, newPickerDate: D, newViewMode: CalendarViewMode): string => {
    switch (newViewMode.id) {
      case CalendarViewModes.DATE.id: {
        const month: string = dateService.getMonthName(newVisibleDate, TranslationWidth.LONG);
        const year: number = dateService.getYear(newVisibleDate);
        return `${month} ${year}`;
      }
      case CalendarViewModes.MONTH.id: {
        return `${dateService.getYear(newPickerDate)}`;
      }
      case CalendarViewModes.YEAR.id: {
        const minDateFormat: number = dateService.getYear(newPickerDate);
        const maxDateFormat: number = minDateFormat + VIEWS_IN_PICKER - 1;

        return `${minDateFormat} - ${maxDateFormat}`;
      }
      default: return;
    }
  };

  const renderDayIfNeeded = (item: CalendarDateInfo<D>, style: StyleType): CalendarDateContentElement => {
    const shouldRender: boolean = !item.bounding || boundingMonth;

    if (shouldRender) {
      const renderSelector = props.renderDay || renderDayElement;
      return renderSelector(item, style);
    }

    return null;
  };

  const renderWeekdayElement = (weekday: string, index: number): CalendarDateContentElement => {
    return (
      <CalendarDateContent
        key={index}
        textStyle={getWeekdayStyle(props.eva.style)}
      >
        {weekday}
      </CalendarDateContent>
    );
  };

  const renderDayElement = ({ date }: CalendarDateInfo<D>, evaStyle: StyleType): CalendarDateContentElement => {
    return (
      <CalendarDateContent
        style={evaStyle.container}
        textStyle={evaStyle.text}
      >
        {dateService.getDate(date)}
      </CalendarDateContent>
    );
  };

  const renderMonthElement = ({ date }: CalendarDateInfo<D>, evaStyle: StyleType): CalendarDateContentElement => {
    return (
      <CalendarDateContent
        style={evaStyle.container}
        textStyle={evaStyle.text}
      >
        {dateService.getMonthName(date, TranslationWidth.SHORT)}
      </CalendarDateContent>
    );
  };

  const renderYearElement = ({ date }: CalendarDateInfo<D>, evaStyle: StyleType): CalendarDateContentElement => {
    return (
      <CalendarDateContent
        style={evaStyle.container}
        textStyle={evaStyle.text}
      >
        {dateService.getYear(date)}
      </CalendarDateContent>
    );
  };

  const renderDayPickerElement = (date: D, evaStyle: StyleType): React.ReactElement => {
    return (
      <>
        <CalendarMonthHeader
          style={evaStyle.daysHeaderContainer}
          data={dateService.getDayOfWeekNames()}
        >
          {renderWeekdayElement}
        </CalendarMonthHeader>
        <Divider style={evaStyle.divider} />
        <CalendarPicker
          rowStyle={evaStyle.row}
          data={props.createDates(date)}
          onSelect={onDaySelect}
          isItemSelected={isDaySelected}
          isItemDisabled={isDayDisabled}
          isItemToday={isDayToday}
          shouldItemUpdate={props.shouldUpdateDate}
        >
          {renderDayIfNeeded}
        </CalendarPicker>
      </>
    );
  };

  const renderMonthPickerElement = (date: D, evaStyle: StyleType): CalendarPickerElement<D> => {
    return (
      <CalendarPicker
        rowStyle={evaStyle.row}
        data={dataService.createMonthPickerData(date, PICKER_ROWS, PICKER_COLUMNS)}
        onSelect={onMonthSelect}
        isItemSelected={isMonthSelected}
        isItemDisabled={isMonthDisabled}
        isItemToday={isMonthToday}
      >
        {props.renderMonth || renderMonthElement}
      </CalendarPicker>
    );
  };

  const renderYearPickerElement = (date: D, style: StyleType): CalendarPickerElement<D> => {
    return (
      <CalendarPicker
        rowStyle={style.row}
        data={dataService.createYearPickerData(date, PICKER_ROWS, PICKER_COLUMNS)}
        onSelect={onYearSelect}
        isItemSelected={isYearSelected}
        isItemDisabled={isYearDisabled}
        isItemToday={isYearToday}
      >
        {props.renderYear || renderYearElement}
      </CalendarPicker>
    );
  };

  const renderPickerElement = (style: StyleType): React.ReactNode => {
    switch (viewMode.id) {
      case CalendarViewModes.DATE.id:
        return renderDayPickerElement(visibleDate, style);
      case CalendarViewModes.MONTH.id:
        return renderMonthPickerElement(pickerDate, style);
      case CalendarViewModes.YEAR.id:
        return renderYearPickerElement(pickerDate, style);
      default: return;
    }
  };

  const renderFooterElement = (): React.ReactElement => {
    if (props.renderFooter) {
      return props.renderFooter();
    }
    return null;
  };


  const renderHeaderElement = (evaStyle: StyleType): CalendarHeaderElement => {
    const titleSelector = props.title || createViewModeHeaderTitle;

    return (
      <CalendarHeader
        viewModeId={viewMode.id}
        style={evaStyle.headerContainer}
        title={titleSelector(visibleDate, pickerDate, viewMode)}
        titleStyle={evaStyle.title}
        iconStyle={evaStyle.icon}
        lateralNavigationAllowed={isHeaderNavigationAllowed()}
        onTitlePress={onPickerNavigationPress}
        onNavigationLeftPress={onHeaderNavigationLeftPress}
        onNavigationRightPress={onHeaderNavigationRightPress}
        arrowLeftComponent={props.renderArrowLeft}
        arrowRightComponent={props.renderArrowRight}
      />
    );
  };

  const { eva, style, ...viewProps } = props;
  const evaStyle = getCalendarStyle(eva.style);

  return (
    <View
      {...viewProps}
      style={[evaStyle.container, style]}
    >
      {renderHeaderElement(evaStyle)}
      {renderPickerElement(evaStyle)}
      {renderFooterElement()}
    </View>
  );
}

BaseCalendarComponent.displayName = 'BaseCalendarComponent';

const component = React.forwardRef(BaseCalendarComponent);

export {
  component as BaseCalendarComponent,
};
