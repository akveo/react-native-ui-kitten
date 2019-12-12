import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';

const defaultPopover: ComponentShowcaseItem = {
  title: 'Default',
  props: {},
};

const fullWidthPopover: ComponentShowcaseItem = {
  title: 'Full Width',
  props: {
    fullWidth: true,
  },
};

const styledBackdropPopover: ComponentShowcaseItem = {
  title: 'Styled Backdrop',
  props: {
    allowBackdrop: true,
    backdropStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  },
};

const defaultSection: ComponentShowcaseSection = {
  items: [
    defaultPopover,
    fullWidthPopover,
  ],
};

const backdropSection: ComponentShowcaseSection = {
  title: 'Backdrop',
  items: [
    styledBackdropPopover,
  ],
};


export const popoverShowcase: ComponentShowcase = {
  title: 'Popover',
  sections: [
    defaultSection,
    backdropSection,
  ],
};

export const popoverSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'placement',
    value: 'left',
  },
  {
    propertyName: 'placement',
    value: 'left start',
  },
  {
    propertyName: 'placement',
    value: 'left end',
  },
  {
    propertyName: 'placement',
    value: 'top',
  },
  {
    propertyName: 'placement',
    value: 'top start',
  },
  {
    propertyName: 'placement',
    value: 'top end',
  },
  {
    propertyName: 'placement',
    value: 'right',
  },
  {
    propertyName: 'placement',
    value: 'right start',
  },
  {
    propertyName: 'placement',
    value: 'right end',
  },
  {
    propertyName: 'placement',
    value: 'bottom',
  },
  {
    propertyName: 'placement',
    value: 'bottom start',
  },
  {
    propertyName: 'placement',
    value: 'bottom end',
  },
];
