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

const giantCheckBox: ComponentShowcaseItem = {
  title: 'Giant',
  props: {
    size: 'giant',
  },
};

const largeCheckBox: ComponentShowcaseItem = {
  title: 'Large',
  props: {
    size: 'large',
  },
};

const mediumCheckBox: ComponentShowcaseItem = {
  title: 'Medium',
  props: {
    size: 'medium',
  },
};

const smallCheckBox: ComponentShowcaseItem = {
  title: 'Small',
  props: {
    size: 'small',
  },
};

const tinyCheckBox: ComponentShowcaseItem = {
  title: 'Tiny',
  props: {
    size: 'tiny',
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

const sizeSection: ComponentShowcaseSection = {
  title: 'Size',
  items: [
    giantCheckBox,
    largeCheckBox,
    mediumCheckBox,
    smallCheckBox,
    tinyCheckBox,
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
    sizeSection,
    statusSection,
  ],
};
