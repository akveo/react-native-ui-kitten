import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '../common/type';
import { CalendarCustomItem } from './calendarCustomItem.component';
import { CalendarCustomHeader } from './calendarCustomHeader.component';

const defaultCalendar: ComponentShowcaseItem = {
  props: {
    min: new Date(2019, 0, 1),
    max: new Date(2019, 1, 0),
    date: new Date(2019, 0, 1),
  },
};

const boundingCalendar: ComponentShowcaseItem = {
  props: {
    ...defaultCalendar.props,
    bounding: true,
  },
};

const customItemCalendar: ComponentShowcaseItem = {
  props: {
    ...defaultCalendar.props,
    renderItem: CalendarCustomItem,
  },
};

const customHeaderCalendar: ComponentShowcaseItem = {
  props: {
    ...defaultCalendar.props,
    renderMonthHeader: CalendarCustomHeader,
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

const boundingSection: ComponentShowcaseSection = {
  title: 'Bounding',
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

const customHeaderSection: ComponentShowcaseSection = {
  title: 'Custom Header',
  items: [
    customHeaderCalendar,
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
    boundingSection,
    customItemSection,
    customHeaderSection,
    filterSection,
  ],
};
