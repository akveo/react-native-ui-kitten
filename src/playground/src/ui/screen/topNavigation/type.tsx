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

const RightControlIcon = (style: StyleType): IconElement => {
  return (
    <Icon {...style} name='star' />
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
