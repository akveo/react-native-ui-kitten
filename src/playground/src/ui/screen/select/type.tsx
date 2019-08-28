import React from 'react';
import {
  Image,
  ImageProps,
} from 'react-native';
import { SelectOptionType } from '@kitten/ui';
import { StyleType } from '@kitten/theme';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

const iconClosedUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/arrow-ios-downward.png';
const iconOpenedUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/arrow-ios-upward.png';

const defaultSelectOption: SelectOptionType[] = [
  { text: 'Option 1', disabled: true },
  { text: 'Option 2' },
  { text: 'Option 3' },
  { text: 'Option 4' },
  { text: 'Option 5' },
  { text: 'Option 6' },
  { text: 'Option 7' },
  { text: 'Option 8' },
];

const withGroupsSelectOption: SelectOptionType[] = [
  { text: 'Option 1' },
  {
    text: 'Option 2',
    items: [
      { text: 'Option 21', disabled: true },
      { text: 'Option 22' },
      { text: 'Option 23' },
    ],
  },
  { text: 'Option 3' },
  { text: 'Option 4' },
  { text: 'Option 5' },
];

const renderIcon = (style: StyleType, visible: boolean): React.ReactElement<ImageProps> => {
  const uri: string = visible ? iconOpenedUri : iconClosedUri;

  return (
    <Image
      source={{ uri }}
      style={style}
    />
  );
};

const defaultSelect: ComponentShowcaseItem = {
  title: 'Default',
  props: {
    data: defaultSelectOption,
  },
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default Select',
  items: [
    defaultSelect,
  ],
};

const multiSelectSelect: ComponentShowcaseItem = {
  title: 'Multiselect',
  props: {
    multiSelect: true,
    data: defaultSelectOption,
  },
};

const multiSelectSection: ComponentShowcaseSection = {
  title: 'Multiselect Select',
  items: [
    multiSelectSelect,
  ],
};

const groupSelect: ComponentShowcaseItem = {
  title: 'With Groups',
  props: {
    data: withGroupsSelectOption,
  },
};

const groupSelectMultiselect: ComponentShowcaseItem = {
  title: 'Multiselect',
  props: {
    multiSelect: true,
    data: withGroupsSelectOption,
  },
};

const withGroupsSection: ComponentShowcaseSection = {
  title: 'Groups Select',
  items: [
    groupSelect,
    groupSelectMultiselect,
  ],
};

const withIconSelect: ComponentShowcaseItem = {
  title: 'With icon',
  props: {
    data: defaultSelectOption,
    icon: renderIcon,
    multiSelect: true,
  },
};

const withIconSection: ComponentShowcaseSection = {
  title: 'With icon',
  items: [
    withIconSelect,
  ],
};

const withLabelSelect: ComponentShowcaseItem = {
  title: 'Label',
  props: {
    data: defaultSelectOption,
    icon: renderIcon,
    label: 'Label',
  },
};

const withCustomPlaceholderSelect: ComponentShowcaseItem = {
  title: 'Placeholder',
  props: {
    data: defaultSelectOption,
    icon: renderIcon,
    placeholder: 'Custom Placeholder',
  },
};

const customTextsSection: ComponentShowcaseSection = {
  title: 'Texts',
  items: [
    withLabelSelect,
    withCustomPlaceholderSelect,
  ],
};

export const selectShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
    multiSelectSection,
    withGroupsSection,
    withIconSection,
    customTextsSection,
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
];
