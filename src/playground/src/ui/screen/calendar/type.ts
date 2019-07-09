import { CalendarViewModes } from '@kitten/ui';
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

const startViewCalendar: ComponentShowcaseItem = {
  props: {
    startView: CalendarViewModes.MONTH,
  },
};

const boundedCalendar: ComponentShowcaseItem = {
  props: {
    min: new Date(now.getFullYear() - 1, 0, 1),
    max: new Date(now.getFullYear() + 1, 0, 1),
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
    startViewSection,
    boundedSection,
    customItemSection,
    boundingMonthSection,
    filterSection,
    customTitlesSection,
  ],
};
