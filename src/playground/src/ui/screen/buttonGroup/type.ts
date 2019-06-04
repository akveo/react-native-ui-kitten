import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

const defaultButtonGroup: ComponentShowcaseItem = {
  title: 'Filled',
  props: {},
};

const giantButtonGroup: ComponentShowcaseItem = {
  title: 'Giant',
  props: {
    size: 'giant',
  },
};

const largeButtonGroup: ComponentShowcaseItem = {
  title: 'Large',
  props: {
    size: 'large',
  },
};

const mediumButtonGroup: ComponentShowcaseItem = {
  title: 'Medium',
  props: {
    size: 'medium',
  },
};

const smallButtonGroup: ComponentShowcaseItem = {
  title: 'Small',
  props: {
    size: 'small',
  },
};

const tinyButtonGroup: ComponentShowcaseItem = {
  title: 'Tiny',
  props: {
    size: 'tiny',
  },
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultButtonGroup,
  ],
};

const sizeSection: ComponentShowcaseSection = {
  title: 'Size',
  items: [
    giantButtonGroup,
    largeButtonGroup,
    mediumButtonGroup,
    smallButtonGroup,
    tinyButtonGroup,
  ],
};

export const buttonGroupShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
    sizeSection,
  ],
};

export const buttonGroupSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'appearance',
    value: 'filled',
  },
  {
    propertyName: 'appearance',
    value: 'outline',
  },
  {
    propertyName: 'appearance',
    value: 'ghost',
  },
  {
    propertyName: 'status',
    value: 'primary',
  },
  {
    propertyName: 'status',
    value: 'success',
  },
  {
    propertyName: 'status',
    value: 'info',
  },
  {
    propertyName: 'status',
    value: 'warning',
  },
  {
    propertyName: 'status',
    value: 'danger',
  },
  {
    propertyName: 'status',
    value: 'white',
  },
];
