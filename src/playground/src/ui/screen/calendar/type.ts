import moment from 'moment';
import { CalendarViewModes } from '@kitten/ui';
import { MomentDateService } from '@ui-kitten/moment';
import { DateFnsService } from '@ui-kitten/date-fns';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '../common/type';
import { CalendarCustomItem } from './calendarCustomItem.component';

const now: Date = new Date();

const defaultCalendar: ComponentShowcaseItem = {
  props: {},
};

const momentCalendar: ComponentShowcaseItem = {
  props: {
    date: moment(),
    dateService: new MomentDateService('en'),
  },
};

const dateFnsCalendar: ComponentShowcaseItem = {
  props: {
    dateService: new DateFnsService('en'),
  },
};

const startViewCalendar: ComponentShowcaseItem = {
  props: {
    startView: CalendarViewModes.MONTH,
  },
};

const boundedCalendar: ComponentShowcaseItem = {
  props: {
    min: now,
    max: now,
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
    momentCalendar,
  ],
};

const startViewSection: ComponentShowcaseSection = {
  title: 'Start View',
  items: [
    startViewCalendar,
  ],
};

const boundedSection: ComponentShowcaseSection = {
  title: 'Bounded',
  items: [
    boundedCalendar,
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

export const calendarShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
    // momentSection,
    // dateFnsCalendar
    // startViewSection,
    // boundedSection,
    customItemSection,
    // boundingMonthSection,
    filterSection,
    // customTitlesSection,
  ],
};
