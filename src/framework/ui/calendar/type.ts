const VIEW_MODE_DATE: CalendarViewMode = {
  id: 'DATE',
  navigationNext: (): CalendarViewMode => {
    return VIEW_MODE_MONTH;
  },
  pickNext: (): CalendarViewMode => {
    return VIEW_MODE_DATE;
  },
};

const VIEW_MODE_MONTH: CalendarViewMode = {
  id: 'MONTH',
  navigationNext: (): CalendarViewMode => {
    return VIEW_MODE_YEAR;
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
    return VIEW_MODE_DATE;
  },
};

export interface CalendarViewMode {
  id: string;
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
