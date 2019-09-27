import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '../common/type';

const now: Date = new Date();

const defaultCalendar: ComponentShowcaseItem = {
  props: {
    min: new Date(now.getFullYear() - 12, 0, 1),
    max: new Date(now.getFullYear() + 12, 0, 1),
  },
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultCalendar,
  ],
};

export const calendarShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
  ],
};
