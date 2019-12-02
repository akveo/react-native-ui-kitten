import React from 'react';
import { Icon } from '@ui-kitten/components';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';
import { StarIcon } from '@pg/icons';

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
    icon: StarIcon,
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
    captionIcon: StarIcon,
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

export const inputShowcase: ComponentShowcase = {
  title: 'Input',
  sections: [
    stateSection,
    accessoriesSection,
  ],
};

export const inputSettings: ComponentShowcaseSetting[] = [
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
    value: 'basic',
  },
  {
    propertyName: 'status',
    value: 'control',
  },
  {
    propertyName: 'size',
    value: 'small',
  },
  {
    propertyName: 'size',
    value: 'medium',
  },
  {
    propertyName: 'size',
    value: 'large',
  },
];
