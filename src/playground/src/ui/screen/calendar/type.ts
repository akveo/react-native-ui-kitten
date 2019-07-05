import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '../common/type';
import { CalendarCustomItem } from './calendarCustomItem.component';
import { CalendarCustomHeader } from './calendarCustomHeader.component';

const defaultCalendar: ComponentShowcaseItem = {
  props: {
    min: new Date(),
    max: new Date(),
    date: new Date(),
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

export const calendarShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
    boundingSection,
    customItemSection,
    customHeaderSection,
  ],
};
