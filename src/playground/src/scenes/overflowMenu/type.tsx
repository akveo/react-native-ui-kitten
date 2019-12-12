import React from 'react';
import {
  Icon,
  OverflowMenuItemType,
} from '@ui-kitten/components';
import { StarIcon } from '@pg/icons';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';

const defaultMenuItems: OverflowMenuItemType[] = [
  { title: 'Item 1' },
  { title: 'Item 2' },
  { title: 'Item 3' },
];

const withIconMenuItems: OverflowMenuItemType[] = [
  {
    title: 'Item 1',
    icon: StarIcon,
  },
  {
    title: 'Item 2',
    icon: StarIcon,
  },
  {
    title: 'Item 3',
    icon: StarIcon,
  },
];

const withDisabledItemMenuItems: OverflowMenuItemType[] = [
  {
    title: 'Item 1',
    icon: StarIcon,
  },
  {
    title: 'Item 2',
    icon: StarIcon,
    disabled: true,
  },
  {
    title: 'Item 3',
    icon: StarIcon,
  },
];

const defaultOverflowMenu: ComponentShowcaseItem = {
  title: 'Default',
  props: {
    data: defaultMenuItems,
  },
};

const withIcons: ComponentShowcaseItem = {
  title: 'Icon',
  props: {
    data: withIconMenuItems,
  },
};

const withDisabledItem: ComponentShowcaseItem = {
  title: 'Disabled items',
  props: {
    data: withDisabledItemMenuItems,
  },
};

const styledBackdropOverflowMenu: ComponentShowcaseItem = {
  title: 'Styled backdrop',
  props: {
    data: withIconMenuItems,
    allowBackdrop: true,
    backdropStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  },
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultOverflowMenu,
    withDisabledItem,
  ],
};

const accessoriesSection: ComponentShowcaseSection = {
  title: 'Accessories',
  items: [
    withIcons,
  ],
};

const backdropSection: ComponentShowcaseSection = {
  title: 'Backdrop',
  items: [
    styledBackdropOverflowMenu,
  ],
};

export const overflowMenuShowcase: ComponentShowcase = {
  title: 'Overflow Menu',
  sections: [
    defaultSection,
    accessoriesSection,
    backdropSection,
  ],
};

export const overflowMenuSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'appearance',
    value: 'default',
  },
  {
    propertyName: 'appearance',
    value: 'noDivider',
  },
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
