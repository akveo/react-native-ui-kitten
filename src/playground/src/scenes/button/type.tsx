import React from 'react';
import { StarIcon } from '@pg/icons';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';

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
    icon: StarIcon,
  },
};

const rightIconButton: ComponentShowcaseItem = {
  title: 'Right Icon',
  props: {
    icon: StarIcon,
    style: {
      flexDirection: 'row-reverse',
    },
  },
};

const disabledIconButton: ComponentShowcaseItem = {
  title: 'Disabled',
  props: {
    icon: StarIcon,
    disabled: true,
  },
};

const giantButton: ComponentShowcaseItem = {
  title: 'Giant',
  props: {
    icon: StarIcon,
    size: 'giant',
  },
};

const largeButton: ComponentShowcaseItem = {
  title: 'Large',
  props: {
    icon: StarIcon,
    size: 'large',
  },
};

const mediumButton: ComponentShowcaseItem = {
  title: 'Medium',
  props: {
    icon: StarIcon,
    size: 'medium',
  },
};

const smallButton: ComponentShowcaseItem = {
  title: 'Small',
  props: {
    icon: StarIcon,
    size: 'small',
  },
};

const tinyButton: ComponentShowcaseItem = {
  title: 'Tiny',
  props: {
    icon: StarIcon,
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
  title: 'Button',
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

