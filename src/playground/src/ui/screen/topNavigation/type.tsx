import React from 'react';
import {
  Icon,
  TopNavigationAction,
  StyleType,
  IconElement,
} from 'react-native-ui-kitten';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

const BackIcon = (style: StyleType): IconElement => {
  return (
    <Icon {...style} name='arrow-back' />
  );
};

const StarIcon = (style: StyleType): IconElement => {
  return (
    <Icon {...style} name='star' />
  );
};

const MenuIcon = (style: StyleType): IconElement => {
  return (
    <Icon {...style} name='more-vertical' />
  );
};

const rightControlsTopNavigation: ComponentShowcaseItem = {
  props: {
    title: 'Title',
    subtitle: 'Subtitle',
    leftControl: <TopNavigationAction icon={BackIcon}/>,
    rightControls: [
      <TopNavigationAction icon={StarIcon}/>,
      <TopNavigationAction icon={MenuIcon}/>,
    ],
  },
};

const leftControlTopNavigation: ComponentShowcaseItem = {
  props: {
    title: 'Title',
    subtitle: 'Subtitle',
    leftControl: <TopNavigationAction icon={BackIcon}/>,
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
    propertyName: 'appearance',
    value: 'default',
  },
  {
    propertyName: 'appearance',
    value: 'control',
  },
  {
    propertyName: 'alignment',
    value: 'start',
  },
  {
    propertyName: 'alignment',
    value: 'center',
  },
];
