import React from 'react';
import {
  Image,
  ImageProps,
} from 'react-native';
import { StyleType } from '@kitten/theme';
import { TopNavigationAction } from '@kitten/ui';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

const RightControlIcon = (style: StyleType): React.ReactElement<ImageProps> => {
  return (
    <Image
      style={style}
      source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
    />
  );
};

const rightControlsTopNavigation: ComponentShowcaseItem = {
  props: {
    title: 'Title',
    subtitle: 'Subtitle',
    leftControl: <TopNavigationAction icon={RightControlIcon}/>,
    rightControls: [
      <TopNavigationAction icon={RightControlIcon}/>,
      <TopNavigationAction icon={RightControlIcon}/>,
    ],
  },
};

const leftControlTopNavigation: ComponentShowcaseItem = {
  props: {
    title: 'Title',
    subtitle: 'Subtitle',
    leftControl: <TopNavigationAction icon={RightControlIcon}/>,
  },
};

const subtitleTopNavigation: ComponentShowcaseItem = {
  props: {
    title: 'Title',
    subtitle: 'Subtitle',
  },
};

const titleTopNavigation: ComponentShowcaseItem = {
  props: {
    title: 'Title',
  },
};

const rightControlsSection: ComponentShowcaseSection = {
  title: 'Right Controls',
  items: [
    rightControlsTopNavigation,
  ],
};

const leftControlSection: ComponentShowcaseSection = {
  title: 'Left Control',
  items: [
    leftControlTopNavigation,
  ],
};

const subtitleSection: ComponentShowcaseSection = {
  title: 'Subtitle',
  items: [
    subtitleTopNavigation,
  ],
};

const titleSection: ComponentShowcaseSection = {
  title: 'Title',
  items: [
    titleTopNavigation,
  ],
};

export const topNavigationShowcase: ComponentShowcase = {
  sections: [
    titleSection,
    subtitleSection,
    leftControlSection,
    rightControlsSection,
  ],
};

export const topNavigationSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'alignment',
    value: 'start',
  },
  {
    propertyName: 'alignment',
    value: 'center',
  },
];
