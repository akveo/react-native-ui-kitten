import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';
import { StarIcon } from '@pg/icons';

const defaultTooltip: ComponentShowcaseItem = {
  title: 'Default',
  props: {},
};

const iconTooltip: ComponentShowcaseItem = {
  title: 'With Icon',
  props: {
    icon: StarIcon,
  },
};

const backdropTooltip: ComponentShowcaseItem = {
  title: 'Styled backdrop',
  props: {
    allowBackdrop: true,
    backdropStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  },
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultTooltip,
  ],
};

const accessoriesSection: ComponentShowcaseSection = {
  title: 'Accessories',
  items: [
    iconTooltip,
  ],
};

const backdropSection: ComponentShowcaseSection = {
  title: 'Backdrop',
  items: [
    backdropTooltip,
  ],
};


export const tooltipShowcase: ComponentShowcase = {
  title: 'Tooltip',
  sections: [
    defaultSection,
    accessoriesSection,
    backdropSection,
  ],
};

export const tooltipSettings: ComponentShowcaseSetting[] = [
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
