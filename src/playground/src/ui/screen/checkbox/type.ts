import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
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

const primaryCheckBox: ComponentShowcaseItem = {
  title: 'Primary',
  props: {
    status: 'primary',
  },
};

const successCheckBox: ComponentShowcaseItem = {
  title: 'Success',
  props: {
    status: 'success',
  },
};

const warningCheckBox: ComponentShowcaseItem = {
  title: 'Warning',
  props: {
    status: 'warning',
  },
};

const dangerCheckBox: ComponentShowcaseItem = {
  title: 'Danger',
  props: {
    status: 'danger',
  },
};

const infoCheckBox: ComponentShowcaseItem = {
  title: 'info',
  props: {
    status: 'info',
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
  ],
};

const statusSection: ComponentShowcaseSection = {
  title: 'Status',
  items: [
    primaryCheckBox,
    successCheckBox,
    warningCheckBox,
    dangerCheckBox,
    infoCheckBox,
  ],
};

export const checkboxShowcase: ComponentShowcase = {
  sections: [
    stateSection,
    accessoriesSection,
    statusSection,
  ],
};
