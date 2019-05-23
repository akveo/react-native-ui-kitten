import React from 'react';
import { Image } from 'react-native';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '../common/type';
import { StyleType } from '@kitten/theme';

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
    icon: (style: StyleType) =>
      <Image
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
        style={style}
      />,
  },
};

const rightIconButton: ComponentShowcaseItem = {
  title: 'Right Icon',
  props: {
    icon: (style: StyleType) =>
      <Image
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
        style={style}
      />,
    style: {
      flex: 1,
      flexDirection: 'row-reverse',
    },
  },
};

const filledButton: ComponentShowcaseItem = {
  title: 'Filled',
  props: {
    appearance: 'filled',
  },
};

const outlineButton: ComponentShowcaseItem = {
  title: 'Outline',
  props: {
    appearance: 'outline',
  },
};

const ghostButton: ComponentShowcaseItem = {
  title: 'Ghost',
  props: {
    appearance: 'ghost',
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

const primaryButton: ComponentShowcaseItem = {
  title: 'Primary',
  props: {
    status: 'primary',
  },
};

const successButton: ComponentShowcaseItem = {
  title: 'Success',
  props: {
    status: 'success',
  },
};

const warningButton: ComponentShowcaseItem = {
  title: 'Warning',
  props: {
    status: 'warning',
  },
};

const dangerButton: ComponentShowcaseItem = {
  title: 'Danger',
  props: {
    status: 'danger',
  },
};

const infoButton: ComponentShowcaseItem = {
  title: 'Info',
  props: {
    status: 'info',
  },
};

const whiteButton: ComponentShowcaseItem = {
  title: 'White',
  props: {
    status: 'white',
  },
};

const stateSection: ComponentShowcaseSection = {
  title: 'State',
  items: [
    defaultButton,
    disabledButton,
  ],
};

const accessoriesSection: ComponentShowcaseSection = {
  title: 'Accessories',
  items: [
    leftIconButton,
    rightIconButton,
  ],
};

const appearanceSection: ComponentShowcaseSection = {
  title: 'Appearance',
  items: [
    filledButton,
    outlineButton,
    ghostButton,
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

const statusSection: ComponentShowcaseSection = {
  title: 'Status',
  items: [
    primaryButton,
    successButton,
    warningButton,
    dangerButton,
    infoButton,
    whiteButton,
  ],
};

export const buttonShowcase: ComponentShowcase = {
  sections: [
    stateSection,
    accessoriesSection,
    appearanceSection,
    sizeSection,
    statusSection,
  ],
};
