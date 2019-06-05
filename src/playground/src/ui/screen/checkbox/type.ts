import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

const checkedCheckBox: ComponentShowcaseItem = {
  title: 'Checked',
  props: {
    checked: true,
  },
};

const uncheckedCheckBox: ComponentShowcaseItem = {
  title: 'Unchecked',
  props: {
    checked: false,
  },
};

const indeterminateCheckBox: ComponentShowcaseItem = {
  title: 'Indeterminate',
  props: {
    indeterminate: true,
  },
};

const disabledCheckBox: ComponentShowcaseItem = {
  title: 'Disabled',
  props: {
    disabled: true,
  },
};

const textCheckBox: ComponentShowcaseItem = {
  title: 'Text',
  props: {
    text: 'Place your text',
  },
};

const textDisabledCheckBox: ComponentShowcaseItem = {
  title: 'Disabled Text',
  props: {
    disabled: true,
    text: 'Place your text',
  },
};

const stateSection: ComponentShowcaseSection = {
  title: 'State',
  items: [
    checkedCheckBox,
    uncheckedCheckBox,
    indeterminateCheckBox,
    disabledCheckBox,
  ],
};

const accessoriesSection: ComponentShowcaseSection = {
  title: 'Accessories',
  items: [
    textCheckBox,
    textDisabledCheckBox,
  ],
};

export const checkboxShowcase: ComponentShowcase = {
  sections: [
    stateSection,
    accessoriesSection,
  ],
};

export const checkboxSettings: ComponentShowcaseSetting[] = [
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
];
