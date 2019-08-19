import React from 'react';
import {
  Image,
  ImageProps,
} from 'react-native';
import { DropdownItemType } from '@kitten/ui';
import { StyleType } from '@kitten/theme';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

const iconClosedUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/arrow-ios-downward.png';
const iconOpenedUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/arrow-ios-upward.png';

const defaultDropdownOption: DropdownItemType[] = [
  { text: 'Option 1', disabled: true },
  { text: 'Option 2' },
  { text: 'Option 3' },
  { text: 'Option 4' },
  { text: 'Option 5' },
  { text: 'Option 6' },
  { text: 'Option 7' },
  { text: 'Option 8' },
];

const withGroupsDropdownOption: DropdownItemType[] = [
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

const defaultDropdown: ComponentShowcaseItem = {
  title: 'Default',
  props: {
    data: defaultDropdownOption,
  },
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default Dropdown',
  items: [
    defaultDropdown,
  ],
};

const multiSelectDropdown: ComponentShowcaseItem = {
  title: 'Multiselect',
  props: {
    multiSelect: true,
    data: defaultDropdownOption,
  },
};

const multiSelectSection: ComponentShowcaseSection = {
  title: 'Multiselect Dropdown',
  items: [
    multiSelectDropdown,
  ],
};

const groupDropdown: ComponentShowcaseItem = {
  title: 'With Groups',
  props: {
    data: withGroupsDropdownOption,
  },
};

const groupDropdownMultiselect: ComponentShowcaseItem = {
  title: 'Multiselect',
  props: {
    multiSelect: true,
    data: withGroupsDropdownOption,
  },
};

const withGroupsSection: ComponentShowcaseSection = {
  title: 'Groups Dropdown',
  items: [
    groupDropdown,
    groupDropdownMultiselect,
  ],
};

const withIconDropdown: ComponentShowcaseItem = {
  title: 'With icon',
  props: {
    data: defaultDropdownOption,
    icon: renderIcon,
    multiSelect: true,
  },
};

const withIconSection: ComponentShowcaseSection = {
  title: 'With icon',
  items: [
    withIconDropdown,
  ],
};

const withLabelDropdown: ComponentShowcaseItem = {
  title: 'Label',
  props: {
    data: defaultDropdownOption,
    icon: renderIcon,
    label: 'Label',
  },
};

const withCustomPlaceholderDropdown: ComponentShowcaseItem = {
  title: 'Placeholder',
  props: {
    data: defaultDropdownOption,
    icon: renderIcon,
    placeholder: 'Custom Placeholder',
  },
};

const customTextsSection: ComponentShowcaseSection = {
  title: 'Texts',
  items: [
    withLabelDropdown,
    withCustomPlaceholderDropdown,
  ],
};

export const dropdownShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
    multiSelectSection,
    withGroupsSection,
    withIconSection,
    customTextsSection,
  ],
};

export const dropdownSettings: ComponentShowcaseSetting[] = [
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
