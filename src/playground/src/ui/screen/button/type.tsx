import React from 'react';
import {
  Image,
  ImageProps,
} from 'react-native';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';
import { StyleType } from '@kitten/theme';
import { Icon } from '@kitten/ui';

const IconElement = (style: StyleType): React.ReactElement<ImageProps> => (
  <Icon name='star' {...style}/>
);

const defaultButton: ComponentShowcaseItem = {
  title: 'Default',
  props: {},
};

const disabledButton: ComponentShowcaseItem = {
  title: 'Disabled',
  props: {
    disabled: true,
  },
};

const leftIconButton: ComponentShowcaseItem = {
  title: 'Left Icon',
  props: {
    icon: IconElement,
  },
};

const rightIconButton: ComponentShowcaseItem = {
  title: 'Right Icon',
  props: {
    icon: IconElement,
    style: {
      flexDirection: 'row-reverse',
    },
  },
};

const disabledIconButton: ComponentShowcaseItem = {
  title: 'Disabled',
  props: {
    icon: IconElement,
    disabled: true,
  },
};

const giantButton: ComponentShowcaseItem = {
  title: 'Giant',
  props: {
    size: 'giant',
  },
};

const largeButton: ComponentShowcaseItem = {
  title: 'Large',
  props: {
    size: 'large',
  },
};

const mediumButton: ComponentShowcaseItem = {
  title: 'Medium',
  props: {
    size: 'medium',
  },
};

const smallButton: ComponentShowcaseItem = {
  title: 'Small',
  props: {
    size: 'small',
  },
};

const tinyButton: ComponentShowcaseItem = {
  title: 'Tiny',
  props: {
    size: 'tiny',
  },
};
const textSection: ComponentShowcaseSection = {
  title: 'Text',
  items: [
    defaultButton,
    disabledButton,
  ],
};

const iconSection: ComponentShowcaseSection = {
  title: 'Icon',
  items: [
    leftIconButton,
    rightIconButton,
    disabledIconButton,
  ],
};

const sizeSection: ComponentShowcaseSection = {
  title: 'Size',
  items: [
    giantButton,
    largeButton,
    mediumButton,
    smallButton,
    tinyButton,
  ],
};

export const buttonShowcase: ComponentShowcase = {
  sections: [
    textSection,
    iconSection,
    sizeSection,
  ],
};

export const buttonSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'appearance',
    value: 'filled',
  },
  {
    propertyName: 'appearance',
    value: 'outline',
  },
  {
    propertyName: 'appearance',
    value: 'ghost',
  },
  {
    propertyName: 'status',
    value: 'primary',
  },
  {
    propertyName: 'status',
    value: 'success',
  },
  {
    propertyName: 'status',
    value: 'info',
  },
  {
    propertyName: 'status',
    value: 'warning',
  },
  {
    propertyName: 'status',
    value: 'danger',
  },
  {
    propertyName: 'status',
    value: 'white',
  },
];

