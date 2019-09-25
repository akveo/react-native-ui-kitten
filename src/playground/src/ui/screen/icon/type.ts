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

const zoomIcon: ComponentShowcaseItem = {
  title: 'Zoom',
  props: {
    animation: 'zoom',
  },
};

const pulseIcon: ComponentShowcaseItem = {
  title: 'Pulse',
  props: {
    animation: 'pulse',
  },
};

const shakeIcon: ComponentShowcaseItem = {
  title: 'Shake',
  props: {
    animation: 'shake',
  },
};

const infiniteExample: ComponentShowcaseItem = {
  title: 'Infinite',
  props: {
    animation: 'shake',
    animationConfig: {
      cycles: -1,
    },
  },
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultIcon,
  ],
};

const animationSection: ComponentShowcaseSection = {
  title: 'Animations',
  items: [
    zoomIcon,
    pulseIcon,
    shakeIcon,
  ],
};

const infiniteSection: ComponentShowcaseSection = {
  title: 'Infinite Animation',
  items: [
    infiniteExample,
  ],
};

export const iconShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
    animationSection,
    infiniteSection,
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
