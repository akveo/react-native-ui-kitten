import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

const leftTitleToggle: ComponentShowcaseItem = {
  title: 'Right',
  props: {
    text: 'Place your text',
  },
};

const rightTitleToggle: ComponentShowcaseItem = {
  title: 'Left',
  props: {
    style: { flexDirection: 'row-reverse' },
    text: 'Place your text',
  },
};

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
    checked: false,
    disabled: true,
  },
};

const disabledCheckedToggle: ComponentShowcaseItem = {
  title: 'Disabled Checked',
  props: {
    checked: true,
    disabled: true,
  },
};

const titleSection: ComponentShowcaseSection = {
  title: 'Title',
  items: [
    leftTitleToggle,
    rightTitleToggle,
  ],
};

const stateSection: ComponentShowcaseSection = {
  title: 'State',
  items: [
    checkedToggle,
    uncheckedToggle,
    disabledCheckedToggle,
    disabledUncheckedToggle,
  ],
};

export const toggleShowcase: ComponentShowcase = {
  sections: [
    stateSection,
    titleSection,
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
  {
    propertyName: 'status',
    value: 'basic',
  },
];
