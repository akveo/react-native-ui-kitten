import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
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

const primaryRadio: ComponentShowcaseItem = {
  title: 'Primary',
  props: {
    status: 'primary',
  },
};

const successRadio: ComponentShowcaseItem = {
  title: 'Success',
  props: {
    status: 'success',
  },
};

const warningRadio: ComponentShowcaseItem = {
  title: 'Warning',
  props: {
    status: 'warning',
  },
};

const dangerRadio: ComponentShowcaseItem = {
  title: 'Danger',
  props: {
    status: 'danger',
  },
};

const infoRadio: ComponentShowcaseItem = {
  title: 'Info',
  props: {
    status: 'info',
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
  ],
};

const statusSection: ComponentShowcaseSection = {
  title: 'Status',
  items: [
    primaryRadio,
    successRadio,
    warningRadio,
    dangerRadio,
    infoRadio,
  ],
};

export const radioShowcase: ComponentShowcase = {
  sections: [
    stateSection,
    accessoriesSection,
    statusSection,
  ],
};
