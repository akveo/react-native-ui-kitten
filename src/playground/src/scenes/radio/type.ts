import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';

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

const rightTextRadio: ComponentShowcaseItem = {
  title: 'Right Text',
  props: {
    text: 'Place your text',
  },
};

const leftTextRadio: ComponentShowcaseItem = {
  title: 'Left Text',
  props: {
    style: { flexDirection: 'row-reverse' },
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
    rightTextRadio,
    leftTextRadio,
    textDisabledRadio,
  ],
};

export const radioShowcase: ComponentShowcase = {
  title: 'Radio',
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
