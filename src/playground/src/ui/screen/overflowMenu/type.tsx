import React from 'react';
import {
  Icon,
  IconElement,
  OverflowMenuItemType,
  StyleType,
} from 'react-native-ui-kitten';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

const StarIcon = (style: StyleType): IconElement => (
  <Icon {...style} name='star' />
);

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
  title: 'Icon',
  props: {
    data: withDisabledItemMenuItems,
  },
};

const defaultSection: ComponentShowcaseSection = {
  items: [
    defaultOverflowMenu,
    withIcons,
    withDisabledItem,
  ],
};

export const overflowMenuShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
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
