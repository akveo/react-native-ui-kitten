import React from 'react';
import {
  Icon,
  SelectOptionType,
} from '@ui-kitten/components';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';
import { StarIcon } from '@pg/icons';

const defaultOptions: SelectOptionType[] = [
  { text: 'Option 1' },
  { text: 'Option 2' },
  { text: 'Option 3' },
  { text: 'Option 4' },
  { text: 'Option 5' },
  { text: 'Option 6' },
  { text: 'Option 7' },
  { text: 'Option 8' },
];

const groupedOptions: SelectOptionType[] = [
  {
    text: 'Group 1',
    items: [
      { text: 'Option 1' },
      { text: 'Option 2' },
    ],
  },
  {
    text: 'Group 2',
    items: [
      { text: 'Option 1' },
      { text: 'Option 2' },
    ],
  },
];

const defaultSelect: ComponentShowcaseItem = {
  title: 'Default',
  props: {
    data: defaultOptions,
  },
};

const disabledSelect: ComponentShowcaseItem = {
  title: 'Disabled',
  props: {
    ...defaultSelect.props,
    disabled: true,
  },
};

const initialValueSelect: ComponentShowcaseItem = {
  title: 'Initial Value',
  props: {
    ...defaultSelect.props,
    selectedOption: defaultOptions[0],
  },
};

const multiSelect: ComponentShowcaseItem = {
  title: 'Multiselect',
  props: {
    ...defaultSelect.props,
    multiSelect: true,
  },
};

const multiSelectInitialValue: ComponentShowcaseItem = {
  title: 'Initial Value',
  props: {
    ...multiSelect.props,
    selectedOption: [defaultOptions[0], defaultOptions[1]],
  },
};

const groupSelect: ComponentShowcaseItem = {
  title: 'Default',
  props: {
    ...defaultSelect.props,
    data: groupedOptions,
  },
};

const groupMultiselect: ComponentShowcaseItem = {
  title: 'Multiselect',
  props: {
    ...groupSelect.props,
    multiSelect: true,
  },
};

const withIconSelect: ComponentShowcaseItem = {
  title: 'Icon',
  props: {
    ...defaultSelect.props,
    icon: StarIcon,
  },
};

const withLabelSelect: ComponentShowcaseItem = {
  title: 'Label',
  props: {
    ...defaultSelect.props,
    label: 'LABEL',
  },
};

const placeholderSelect: ComponentShowcaseItem = {
  title: 'Placeholder',
  props: {
    ...defaultSelect.props,
    placeholder: 'Place your Text',
  },
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultSelect,
    disabledSelect,
    initialValueSelect,
  ],
};

const multiSelectSection: ComponentShowcaseSection = {
  title: 'Multiselect',
  items: [
    multiSelect,
    multiSelectInitialValue,
  ],
};

const groupsSection: ComponentShowcaseSection = {
  title: 'Groups',
  items: [
    groupSelect,
    groupMultiselect,
  ],
};

const accessoriesSection: ComponentShowcaseSection = {
  title: 'Accessories',
  items: [
    withIconSelect,
    withLabelSelect,
    placeholderSelect,
  ],
};

export const selectShowcase: ComponentShowcase = {
  title: 'Select',
  sections: [
    defaultSection,
    multiSelectSection,
    groupsSection,
    accessoriesSection,
  ],
};

export const selectSettings: ComponentShowcaseSetting[] = [
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
