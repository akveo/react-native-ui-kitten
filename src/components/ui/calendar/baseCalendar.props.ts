/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { ViewProps } from 'react-native';
import {
  EvaProp,
  StyleType,
} from '../../theme';
import {
  CalendarDateInfo,
  CalendarViewMode,
  CalendarViewModeId,
} from './type';
import { DateService } from './service/date.service';

/**
 * Props shared by `Calendar`, `RangeCalendar` and the datepicker family.
 * Navigation and min/max logic live in `./hooks`.
 */
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
  arrowLeftAccessibilityLabel?: string;
  arrowRightAccessibilityLabel?: string;
  onVisibleDateChange?: (date: D, viewModeId: CalendarViewModeId) => void;
  eva?: EvaProp;
}
