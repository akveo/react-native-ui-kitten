import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

const checkedRadio: ComponentShowcaseItem = {
  title: 'Checked',
  props: {
    checked: true,
  },
};

const uncheckedRadio: ComponentShowcaseItem = {
  title: 'Unchecked',
  props: {
    checked: false,
  },
};

const disabledCheckedRadio: ComponentShowcaseItem = {
  title: 'Disabled Checked',
  props: {
    checked: true,
    disabled: true,
  },
};

const disabledUncheckedRadio: ComponentShowcaseItem = {
  title: 'Disabled Unchecked',
  props: {
    checked: false,
    disabled: true,
  },
};

const textRadio: ComponentShowcaseItem = {
  title: 'Text',
  props: {
    text: 'Place your text',
  },
};

const textDisabledRadio: ComponentShowcaseItem = {
  title: 'Text Disabled',
  props: {
    disabled: true,
    text: 'Place your text',
  },
};

const stateSection: ComponentShowcaseSection = {
  title: 'State',
  items: [
    checkedRadio,
    uncheckedRadio,
    disabledCheckedRadio,
    disabledUncheckedRadio,
  ],
};

const accessoriesSection: ComponentShowcaseSection = {
  title: 'Accessories',
  items: [
    textRadio,
    textDisabledRadio,
  ],
};

export const radioShowcase: ComponentShowcase = {
  sections: [
    stateSection,
    accessoriesSection,
  ],
};

export const radioSettings: ComponentShowcaseSetting[] = [
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
    value: 'control',
  },
  {
    propertyName: 'status',
    value: 'basic',
  },
  {
    propertyName: 'checked',
    value: true,
  },
];
