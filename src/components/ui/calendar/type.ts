/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export interface CalendarDateOptions {
  bounding: boolean;
  holiday: boolean;
  range?: boolean;
}

export interface CalendarRange<D> {
  startDate?: D;
  endDate?: D;
}

export interface CalendarDateInfo<D> extends CalendarDateOptions {
  date: D;
}

const VIEW_MODE_DATE: CalendarViewMode = {
  id: 'DATE',
  navigationNext: (): CalendarViewMode => {
    return VIEW_MODE_YEAR;
  },
  pickNext: (): CalendarViewMode => {
    return VIEW_MODE_DATE;
  },
};

const VIEW_MODE_MONTH: CalendarViewMode = {
  id: 'MONTH',
  navigationNext: (): CalendarViewMode => {
    return VIEW_MODE_DATE;
  },
  pickNext: (): CalendarViewMode => {
    return VIEW_MODE_DATE;
  },
};

const VIEW_MODE_YEAR: CalendarViewMode = {
  id: 'YEAR',
  navigationNext: (): CalendarViewMode => {
    return VIEW_MODE_DATE;
  },
  pickNext: (): CalendarViewMode => {
    return VIEW_MODE_MONTH;
  },
};

export type CalendarViewModeId = 'DATE' | 'MONTH' | 'YEAR';

export interface CalendarViewMode {
  id: CalendarViewModeId;
  navigationNext: () => CalendarViewMode;
  pickNext: () => CalendarViewMode;
}

interface CalendarViewModes {
  DATE: CalendarViewMode;
  MONTH: CalendarViewMode;
  YEAR: CalendarViewMode;
}

export const CalendarViewModes: CalendarViewModes = {
  DATE: VIEW_MODE_DATE,
  MONTH: VIEW_MODE_MONTH,
  YEAR: VIEW_MODE_YEAR,
};

