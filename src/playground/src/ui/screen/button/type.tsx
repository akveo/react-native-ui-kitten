import React from 'react';
import { ImageProps } from 'react-native';
import {
  Icon,
  StyleType,
} from 'react-native-ui-kitten';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

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
    icon: IconElement,
    size: 'giant',
  },
};

const largeButton: ComponentShowcaseItem = {
  title: 'Large',
  props: {
    icon: IconElement,
    size: 'large',
  },
};

const mediumButton: ComponentShowcaseItem = {
  title: 'Medium',
  props: {
    icon: IconElement,
    size: 'medium',
  },
};

const smallButton: ComponentShowcaseItem = {
  title: 'Small',
  props: {
    icon: IconElement,
    size: 'small',
  },
};

const tinyButton: ComponentShowcaseItem = {
  title: 'Tiny',
  props: {
    icon: IconElement,
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
    value: 'control',
  },
  {
    propertyName: 'status',
    value: 'basic',
  },
];

