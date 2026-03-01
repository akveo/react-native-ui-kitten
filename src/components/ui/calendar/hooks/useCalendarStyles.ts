/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { useMemo } from 'react';
import { StyleType } from '../../../theme';
import { CalendarViewMode, CalendarViewModes } from '../type';
import { TranslationWidth } from '../i18n/type';
import { DateService } from '../service/date.service';

const PICKER_ROWS = 4;
const PICKER_COLUMNS = 3;
const VIEWS_IN_PICKER: number = PICKER_ROWS * PICKER_COLUMNS;

export interface CalendarStyles {
  container: StyleType;
  headerContainer: StyleType;
  title: StyleType;
  icon: StyleType;
  divider: StyleType;
  daysHeaderContainer: StyleType;
  row: StyleType;
  weekday: StyleType;
}

export function useCalendarStyles(evaStyle: StyleType): CalendarStyles {
  return useMemo(() => ({
    container: {
      width: evaStyle.width,
      paddingVertical: evaStyle.paddingVertical,
      borderColor: evaStyle.borderColor,
      borderWidth: evaStyle.borderWidth,
      borderRadius: evaStyle.borderRadius,
    },
    headerContainer: {
      paddingHorizontal: evaStyle.headerPaddingHorizontal,
      paddingVertical: evaStyle.headerPaddingVertical,
    },
    title: {
      fontSize: evaStyle.titleFontSize,
      fontWeight: evaStyle.titleFontWeight,
      color: evaStyle.titleColor,
      fontFamily: evaStyle.titleFontFamily,
    },
    icon: {
      width: evaStyle.iconWidth,
      height: evaStyle.iconHeight,
      tintColor: evaStyle.iconTintColor,
    },
    divider: {
      marginVertical: evaStyle.dividerMarginVertical,
    },
    daysHeaderContainer: {
      marginHorizontal: evaStyle.rowMarginHorizontal,
    },
    row: {
      minHeight: evaStyle.rowMinHeight,
      marginHorizontal: evaStyle.rowMarginHorizontal,
    },
    weekday: {
      fontSize: evaStyle.weekdayTextFontSize,
      fontWeight: evaStyle.weekdayTextFontWeight,
      color: evaStyle.weekdayTextColor,
      fontFamily: evaStyle.weekdayTextFontFamily,
    },
  }), [evaStyle]);
}

export interface UseCalendarTitleOptions<D> {
  dateService: DateService<D>;
  visibleDate: D;
  pickerDate: D;
  viewMode: CalendarViewMode;
  customTitle?: (datePickerDate: D, monthYearPickerDate: D, viewMode: CalendarViewMode) => string;
}

export function useCalendarTitle<D>({
  dateService,
  visibleDate,
  pickerDate,
  viewMode,
  customTitle,
}: UseCalendarTitleOptions<D>): string {
  return useMemo(() => {
    if (customTitle) {
      return customTitle(visibleDate, pickerDate, viewMode);
    }

    switch (viewMode.id) {
      case CalendarViewModes.DATE.id: {
        const month = dateService.getMonthName(visibleDate, TranslationWidth.LONG);
        const year = dateService.getYear(visibleDate);
        return `${month} ${year}`;
      }
      case CalendarViewModes.MONTH.id: {
        return `${dateService.getYear(pickerDate)}`;
      }
      case CalendarViewModes.YEAR.id: {
        const minDateFormat = dateService.getYear(pickerDate);
        const maxDateFormat = minDateFormat + VIEWS_IN_PICKER - 1;
        return `${minDateFormat} - ${maxDateFormat}`;
      }
      default:
        return '';
    }
  }, [customTitle, dateService, visibleDate, pickerDate, viewMode]);
}
