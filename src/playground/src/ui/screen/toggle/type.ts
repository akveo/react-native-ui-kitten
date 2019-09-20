import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

const checkedToggle: ComponentShowcaseItem = {
  title: 'Checked',
  props: {
    checked: true,
  },
};

const uncheckedToggle: ComponentShowcaseItem = {
  title: 'Unchecked',
  props: {
    checked: false,
  },
};

const disabledUncheckedToggle: ComponentShowcaseItem = {
  title: 'Disabled Unchecked',
  props: {
    disabled: true,
  },
};

const disabledCheckedToggle: ComponentShowcaseItem = {
  title: 'Disabled Checked',
  props: {
    checked: false,
    disabled: true,
  },
};

const stateSection: ComponentShowcaseSection = {
  title: 'State',
  items: [
    checkedToggle,
    // uncheckedToggle,
    // disabledCheckedToggle,
    // disabledUncheckedToggle,
  ],
};

export const toggleShowcase: ComponentShowcase = {
  sections: [
    stateSection,
  ],
};

export const toggleSettings: ComponentShowcaseSetting[] = [
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
];
