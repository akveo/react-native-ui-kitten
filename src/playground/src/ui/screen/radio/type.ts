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

const disabledRadio: ComponentShowcaseItem = {
  title: 'Disabled',
  props: {
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
    disabledRadio,
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
    propertyName: 'checked',
    value: true,
  },
];
