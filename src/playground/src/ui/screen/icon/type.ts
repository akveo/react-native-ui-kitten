import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

const defaultIcon: ComponentShowcaseItem = {
  title: 'Default',
  props: {},
};

const defaultSection: ComponentShowcaseSection = {
  items: [
    defaultIcon,
  ],
};

export const iconShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
  ],
};

export const iconSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'pack',
    value: 'eva',
  },
  {
    propertyName: 'pack',
    value: 'ant',
  },
  {
    propertyName: 'pack',
    value: 'feather',
  },
  {
    propertyName: 'pack',
    value: 'font-awesome',
  },
  {
    propertyName: 'pack',
    value: 'material',
  },
  {
    propertyName: 'pack',
    value: 'material-community',
  },
];
