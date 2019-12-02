import React from 'react';
import {
  MenuItemType,
  Icon,
} from 'react-native-ui-kitten';
import { StarIcon } from '@pg/icons';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';

const defaultMenuItems: MenuItemType[] = [
  { title: 'Item 1' },
  { title: 'Item 2' },
  { title: 'Item 3' },
];

const withIconMenuItems: MenuItemType[] = [
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

const withDisabledItemMenuItems: MenuItemType[] = [
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

const withGroupsMenuItems: MenuItemType[] = [
  {
    title: 'Item 1',
    icon: StarIcon,
  },
  {
    title: 'Item 2',
    icon: StarIcon,
    subItems: [
      {
        title: 'Item 21',
        icon: StarIcon,
        disabled: true,
      },
      {
        title: 'Item 22',
        icon: StarIcon,
      },
      {
        title: 'Item 23',
        icon: StarIcon,
      },
    ],
  },
  {
    title: 'Item 3',
    icon: StarIcon,
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
  title: 'Menu',
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
