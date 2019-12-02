import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';

const defaultLayout: ComponentShowcaseItem = {
  props: {},
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultLayout,
  ],
};

export const layoutShowcase: ComponentShowcase = {
  title: 'Layout',
  sections: [
    defaultSection,
  ],
};

export const layoutSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'level',
    value: '1',
    description: 'level 1',
  },
  {
    propertyName: 'level',
    value: '2',
    description: 'level 2',
  },
  {
    propertyName: 'level',
    value: '3',
    description: 'level 3',
  },
  {
    propertyName: 'level',
    value: '4',
    description: 'level 4',
  },
];
