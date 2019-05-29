import React from 'react';
import {
  Image,
  ImageProps,
} from 'react-native';
import { StyleType } from '@kitten/theme';
import { Tab } from '@kitten/ui';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '../common/type';

const Icon = (style: StyleType): React.ReactElement<ImageProps> => {
  return (
    <Image source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>
  );
};

const titleBottomNavigation: ComponentShowcaseItem = {
  props: {
    children: [
      <Tab title='Tab 1'/>,
      <Tab title='Tab 2'/>,
      <Tab title='Tab 3'/>,
    ],
  },
};

const iconBottomNavigation: ComponentShowcaseItem = {
  props: {
    children: [
      <Tab icon={Icon}/>,
      <Tab icon={Icon}/>,
      <Tab icon={Icon}/>,
    ],
  },
};

const iconTitleBottomNavigation: ComponentShowcaseItem = {
  props: {
    children: [
      <Tab icon={Icon} title='Tab 1'/>,
      <Tab icon={Icon} title='Tab 2'/>,
      <Tab icon={Icon} title='Tab 3'/>,
    ],
  },
};

const titleSection: ComponentShowcaseSection = {
  title: 'Title',
  items: [
    titleBottomNavigation,
  ],
};

const iconSection: ComponentShowcaseSection = {
  title: 'Icon',
  items: [
    iconBottomNavigation,
  ],
};

const iconTitleSection: ComponentShowcaseSection = {
  title: 'Icon Title',
  items: [
    iconTitleBottomNavigation,
  ],
};

export const tabViewShowcase: ComponentShowcase = {
  sections: [
    titleSection,
    iconSection,
    iconTitleSection,
  ],
};
