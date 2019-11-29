import React from 'react';
import { ImageProps } from 'react-native';
import { Icon, StyleType } from 'react-native-ui-kitten';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

const StarIcon = (style: StyleType): React.ReactElement<ImageProps> => (
  <Icon name='star' {...style}/>
);

const defaultTooltip: ComponentShowcaseItem = {
  title: 'Default',
  props: {},
};

const iconTooltip: ComponentShowcaseItem = {
  title: 'Icon',
  props: {
    icon: StarIcon,
  },
};

const accessoriesSection: ComponentShowcaseSection = {
  items: [
    iconTooltip,
  ],
};

const defaultSection: ComponentShowcaseSection = {
  items: [
    defaultTooltip,
  ],
};

export const tooltipShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
    accessoriesSection,
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
