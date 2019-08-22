import React from 'react';
import {
  Image,
  ImageProps,
} from 'react-native';
import { MenuItemType } from '@kitten/ui';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';
import { StyleType } from '@kitten/theme';

const Icon = (style: StyleType): React.ReactElement<ImageProps> => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
  />
);

const defaultMenuItems: MenuItemType[] = [
  { title: 'Item 1' },
  { title: 'Item 2' },
  { title: 'Item 3' },
];

const withIconMenuItems: MenuItemType[] = [
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

const withDisabledItemMenuItems: MenuItemType[] = [
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

const withGroupsMenuItems: MenuItemType[] = [
  {
    title: 'Item 1',
    icon: Icon,
  },
  {
    title: 'Item 2',
    icon: Icon,
    subItems: [
      {
        title: 'Item 21',
        icon: Icon,
        disabled: true,
      },
      {
        title: 'Item 22',
        icon: Icon,
      },
      {
        title: 'Item 23',
        icon: Icon,
      },
    ],
  },
  {
    title: 'Item 3',
    icon: Icon,
  },
];

const defaultMenu: ComponentShowcaseItem = {
  title: 'Default',
  props: {
    data: defaultMenuItems,
  },
};

const withIconsMenu: ComponentShowcaseItem = {
  title: 'Icon',
  props: {
    data: withIconMenuItems,
  },
};

const withDisabledItemMenu: ComponentShowcaseItem = {
  title: 'Disabled Item',
  props: {
    data: withDisabledItemMenuItems,
  },
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultMenu,
    withIconsMenu,
    withDisabledItemMenu,
  ],
};

const withGroupsMenu: ComponentShowcaseItem = {
  title: 'Groups',
  props: {
    data: withGroupsMenuItems,
  },
};

const withGroupsSection: ComponentShowcaseSection = {
  title: 'With Groups',
  items: [
    withGroupsMenu,
  ],
};

export const menuShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
    withGroupsSection,
  ],
};

export const menuSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'appearance',
    value: 'default',
  },
  {
    propertyName: 'appearance',
    value: 'noDivider',
  },
];
