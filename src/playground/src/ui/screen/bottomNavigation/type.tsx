import React from 'react';
import {
  Image,
  ImageProps,
} from 'react-native';
import { StyleType } from '@kitten/theme';
import { BottomNavigationTab } from '@kitten/ui';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

const Icon = (style: StyleType): React.ReactElement<ImageProps> => {
  return (
    <Image source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>
  );
};

const titleBottomNavigation: ComponentShowcaseItem = {
  props: {
    children: [
      <BottomNavigationTab title='Tab 1'/>,
      <BottomNavigationTab title='Tab 2'/>,
      <BottomNavigationTab title='Tab 3'/>,
    ],
  },
};

const iconBottomNavigation: ComponentShowcaseItem = {
  props: {
    children: [
      <BottomNavigationTab icon={Icon}/>,
      <BottomNavigationTab icon={Icon}/>,
      <BottomNavigationTab icon={Icon}/>,
    ],
  },
};

const iconTitleBottomNavigation: ComponentShowcaseItem = {
  props: {
    children: [
      <BottomNavigationTab icon={Icon} title='Tab 1'/>,
      <BottomNavigationTab icon={Icon} title='Tab 2'/>,
      <BottomNavigationTab icon={Icon} title='Tab 3'/>,
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

export const bottomNavigationShowcase: ComponentShowcase = {
  sections: [
    titleSection,
    iconSection,
    iconTitleSection,
  ],
};

export const bottomNavigationSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'appearance',
    value: 'noIndicator',
    description: 'No Indicator',
  },
];
