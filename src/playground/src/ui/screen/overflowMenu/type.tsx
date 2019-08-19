import React from 'react';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';
import {
  Icon,
  OverflowMenuItemType,
} from '@kitten/ui';
import { ImageProps } from 'react-native';
import { StyleType } from '@kitten/theme';

const IconElement = (style: StyleType): React.ReactElement<ImageProps> => {
  return (
    <Icon name='star' {...style}/>
  );
};

const items: OverflowMenuItemType[] = [
  {
    text: 'Default Item',
  },
  {
    text: 'Icon Item',
    icon: IconElement,
  },
  {
    text: 'Disabled Item',
    disabled: true,
  },
];

const defaultOverflowMenu: ComponentShowcaseItem = {
  title: 'Default',
  props: {
    items: items,
  },
};

const defaultSection: ComponentShowcaseSection = {
  items: [
    defaultOverflowMenu,
  ],
};

export const overflowMenuShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
  ],
};

export const overflowMenuSettings: ComponentShowcaseSetting[] = [
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
