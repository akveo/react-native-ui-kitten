import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

const defaultModal: ComponentShowcaseItem = {
  title: 'Default',
  props: {},
};

const defaultSection: ComponentShowcaseSection = {
  items: [
    defaultModal,
  ],
};

export const modalShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
  ],
};

export const modalSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'animationType',
    value: 'fade',
  },
  {
    propertyName: 'animationType',
    value: 'slideInUp',
  },
];
