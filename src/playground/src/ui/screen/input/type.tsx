import React from 'react';
import { Image } from 'react-native';
import { StyleType } from '@kitten/theme';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '../common/type';


const defaultInput: ComponentShowcaseItem = {
  title: 'Default',
  props: {},
};

const disabledInput: ComponentShowcaseItem = {
  title: 'Disabled',
  props: {
    disabled: true,
  },
};

const iconInput: ComponentShowcaseItem = {
  title: 'Icon',
  props: {
    icon: (style: StyleType) =>
      <Image
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
        style={style}
      />,
  },
};

const labelInput: ComponentShowcaseItem = {
  title: 'Label',
  props: {
    label: 'Place your text',
  },
};

const captionInput: ComponentShowcaseItem = {
  title: 'Caption',
  props: {
    caption: 'Place your text',
  },
};

const captionIconInput: ComponentShowcaseItem = {
  title: 'Caption Icon',
  props: {
    caption: 'Place your text',
    captionIcon: (style: StyleType) =>
      <Image
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
        style={style}
      />,
  },
};

const primaryInput: ComponentShowcaseItem = {
  title: 'Primary',
  props: {
    status: 'primary',
  },
};

const successInput: ComponentShowcaseItem = {
  title: 'Success',
  props: {
    status: 'success',
  },
};

const warningInput: ComponentShowcaseItem = {
  title: 'Warning',
  props: {
    status: 'warning',
  },
};

const dangerInput: ComponentShowcaseItem = {
  title: 'Danger',
  props: {
    status: 'danger',
  },
};

const infoInput: ComponentShowcaseItem = {
  title: 'Info',
  props: {
    status: 'info',
  },
};

const stateSection: ComponentShowcaseSection = {
  title: 'State',
  items: [
    defaultInput,
    disabledInput,
  ],
};

const accessoriesSection: ComponentShowcaseSection = {
  title: 'Accessories',
  items: [
    iconInput,
    labelInput,
    captionInput,
    captionIconInput,
  ],
};

const statusSection: ComponentShowcaseSection = {
  title: 'Status',
  items: [
    primaryInput,
    successInput,
    warningInput,
    dangerInput,
    infoInput,
  ],
};

export const inputShowcase: ComponentShowcase = {
  sections: [
    stateSection,
    accessoriesSection,
    statusSection,
  ],
};
