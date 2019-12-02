import moment from 'moment';
import {
  CalendarViewModes,
  NativeDateService,
} from '@ui-kitten/components';
import { MomentDateService } from '@ui-kitten/moment';
import { DateFnsService } from '@ui-kitten/date-fns';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '@pg/model/componentShowcase.model';
import { CalendarCustomItem } from './calendarCustomItem.component';

const now: Date = new Date();

const defaultCalendar: ComponentShowcaseItem = {
  props: {
    min: new Date(now.getFullYear() - 12, 0, 1),
    max: new Date(now.getFullYear() + 12, 0, 1),
    withFooter: true,
  },
};

const momentCalendar: ComponentShowcaseItem = {
  props: {
    date: moment(),
    dateService: new MomentDateService(),
  },
};

const dateFnsCalendar: ComponentShowcaseItem = {
  props: {
    date: now,
    dateService: new DateFnsService(),
  },
};

const startViewCalendar: ComponentShowcaseItem = {
  props: {
    startView: CalendarViewModes.MONTH,
  },
};

const minMaxCalendar: ComponentShowcaseItem = {
  props: {
    min: new Date(now.getFullYear(), now.getMonth(), 15),
    max: new Date(now.getFullYear(), now.getMonth() + 1, 15),
  },
};

const boundingCalendar: ComponentShowcaseItem = {
  props: {
    ...defaultCalendar.props,
    boundingMonth: true,
  },
};

const customItemCalendar: ComponentShowcaseItem = {
  props: {
    ...defaultCalendar.props,
    renderDay: CalendarCustomItem,
  },
};

const customTitlesCalendar: ComponentShowcaseItem = {
  props: {
    ...defaultCalendar.props,
    title: (date: Date): string => {
      return 'MODE';
    },
    todayTitle: (date: Date): string => {
      return 'TODAY';
    },
  },
};

const filterCalendar: ComponentShowcaseItem = {
  props: {
    ...defaultCalendar.props,
    filter: (date: Date): boolean => {
      return date.getDay() !== 0 && date.getDay() !== 6;
    },
  },
};

const mondayCalendar: ComponentShowcaseItem = {
  props: {
    ...defaultCalendar.props,
    dateService: new NativeDateService('en', {
      startDayOfWeek: 1,
    }),
  },
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultCalendar,
  ],
};

const momentSection: ComponentShowcaseSection = {
  title: 'Moment',
  items: [
    momentCalendar,
  ],
};

const dateFnsSection: ComponentShowcaseSection = {
  title: 'Date FNS',
  items: [
    dateFnsCalendar,
  ],
};

const startViewSection: ComponentShowcaseSection = {
  title: 'Start View',
  items: [
    startViewCalendar,
  ],
};

const minMaxSection: ComponentShowcaseSection = {
  title: 'Date Bounds',
  items: [
    minMaxCalendar,
  ],
};

const boundingMonthSection: ComponentShowcaseSection = {
  title: 'Bounding Month',
  items: [
    boundingCalendar,
  ],
};

const customItemSection: ComponentShowcaseSection = {
  title: 'Custom Day',
  items: [
    customItemCalendar,
  ],
};

const customTitlesSection: ComponentShowcaseSection = {
  title: 'Custom Titles',
  items: [
    customTitlesCalendar,
  ],
};

const filterSection: ComponentShowcaseSection = {
  title: 'Filter',
  items: [
    filterCalendar,
  ],
};

const startDayOfWeekSection: ComponentShowcaseSection = {
  title: 'Start Day of Week',
  items: [
    mondayCalendar,
  ],
};

export const calendarShowcase: ComponentShowcase = {
  title: 'Calendar',
  sections: [
    defaultSection,
    // startDayOfWeekSection,
    // customItemSection,
    // momentSection,
    // dateFnsSection,
    // startViewSection,
    // minMaxSection,
    // boundingMonthSection,
    // filterSection,
    // customTitlesSection,
  ],
};
