import React from 'react';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';
import { OverflowMenuItemType } from '@kitten/ui';
import { Image, ImageProps } from 'react-native';
import { StyleType } from '@kitten/theme';

const Icon = (style: StyleType): React.ReactElement<ImageProps> => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
  />
);

const defaultMenuItems: OverflowMenuItemType[] = [
  { title: 'Item 1' },
  { title: 'Item 2' },
  { title: 'Item 3' },
];

const withIconMenuItems: OverflowMenuItemType[] = [
  {
    title: 'Item 1',
    icon: Icon,
  },
  {
    title: 'Item 2',
    icon: Icon,
  },
  {
    title: 'Item 3',
    icon: Icon,
  },
];

const withDisabledItemMenuItems: OverflowMenuItemType[] = [
  {
    title: 'Item 1',
    icon: Icon,
  },
  {
    title: 'Item 2',
    icon: Icon,
    disabled: true,
  },
  {
    title: 'Item 3',
    icon: Icon,
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
    value: 'top',
  },
  {
    propertyName: 'placement',
    value: 'right',
  },
  {
    propertyName: 'placement',
    value: 'bottom',
  },
];
