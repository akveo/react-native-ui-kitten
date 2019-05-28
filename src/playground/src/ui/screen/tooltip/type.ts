import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

const defaultTooltip: ComponentShowcaseItem = {
  title: 'Default',
  props: {},
};

const defaultSection: ComponentShowcaseSection = {
  items: [
    defaultTooltip,
  ],
};

export const tooltipShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
  ],
};

export const tooltipSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'placement',
    value: 'left',
  },
  {
    propertyName: 'placement',
    value: 'left start',
  },
  {
    propertyName: 'placement',
    value: 'left end',
  },
  {
    propertyName: 'placement',
    value: 'top',
  },
  {
    propertyName: 'placement',
    value: 'top start',
  },
  {
    propertyName: 'placement',
    value: 'top end',
  },
  {
    propertyName: 'placement',
    value: 'right',
  },
  {
    propertyName: 'placement',
    value: 'right start',
  },
  {
    propertyName: 'placement',
    value: 'right end',
  },
  {
    propertyName: 'placement',
    value: 'bottom',
  },
  {
    propertyName: 'placement',
    value: 'bottom start',
  },
  {
    propertyName: 'placement',
    value: 'bottom end',
  },
];
