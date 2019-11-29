import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';

const giantSpinner: ComponentShowcaseItem = {
  title: 'Giant',
  props: {
    size: 'giant',
  },
};

const largeSpinner: ComponentShowcaseItem = {
  title: 'Large',
  props: {
    size: 'large',
  },
};

const mediumSpinner: ComponentShowcaseItem = {
  title: 'Medium',
  props: {
    size: 'medium',
  },
};

const smallSpinner: ComponentShowcaseItem = {
  title: 'Small',
  props: {
    size: 'small',
  },
};

const tinySpinner: ComponentShowcaseItem = {
  title: 'Tiny',
  props: {
    size: 'tiny',
  },
};

const primarySpinner: ComponentShowcaseItem = {
  title: 'Primary',
  props: {
    status: 'primary',
  },
};

const successSpinner: ComponentShowcaseItem = {
  title: 'Success',
  props: {
    status: 'success',
  },
};

const infoSpinner: ComponentShowcaseItem = {
  title: 'Info',
  props: {
    status: 'info',
  },
};

const warningSpinner: ComponentShowcaseItem = {
  title: 'Warning',
  props: {
    status: 'warning',
  },
};

const dangerSpinner: ComponentShowcaseItem = {
  title: 'Danger',
  props: {
    status: 'danger',
  },
};

const basicSpinner: ComponentShowcaseItem = {
  title: 'Basic',
  props: {
    status: 'basic',
  },
};

const controlSpinner: ComponentShowcaseItem = {
  title: 'Control',
  props: {
    status: 'control',
  },
};

const sizeSection: ComponentShowcaseSection = {
  title: 'Size',
  items: [
    giantSpinner,
    largeSpinner,
    mediumSpinner,
    smallSpinner,
    tinySpinner,
  ],
};

const statusSection: ComponentShowcaseSection = {
  title: 'Status',
  items: [
    primarySpinner,
    successSpinner,
    infoSpinner,
    warningSpinner,
    dangerSpinner,
    basicSpinner,
    controlSpinner,
  ],
};

export const spinnerShowcase: ComponentShowcase = {
  title: 'Spinner',
  sections: [
    sizeSection,
    statusSection,
  ],
};

export const spinnerSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'animating',
    value: true,
  },
  {
    propertyName: 'animating',
    value: false,
  },
];

