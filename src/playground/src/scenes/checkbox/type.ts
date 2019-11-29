import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';

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
  title: 'Disabled Checked',
  props: {
    checked: true,
    disabled: true,
  },
};

const disabledUncheckedCheckBox: ComponentShowcaseItem = {
  title: 'Disabled Unchecked',
  props: {
    disabled: true,
  },
};

const rightTextCheckBox: ComponentShowcaseItem = {
  title: 'Right Text',
  props: {
    text: 'Place your text',
  },
};

const leftTextCheckBox: ComponentShowcaseItem = {
  title: 'Left Text',
  props: {
    style: { flexDirection: 'row-reverse' },
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
    disabledUncheckedCheckBox,
  ],
};

const accessoriesSection: ComponentShowcaseSection = {
  title: 'Accessories',
  items: [
    rightTextCheckBox,
    leftTextCheckBox,
    textDisabledCheckBox,
  ],
};

export const checkboxShowcase: ComponentShowcase = {
  title: 'CheckBox',
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
  {
    propertyName: 'status',
    value: 'control',
  },
  {
    propertyName: 'status',
    value: 'basic',
  },
];
