import React from 'react';
import { BottomNavigationTab } from 'react-native-ui-kitten';
import { StarIcon } from '@pg/icons';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';

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
      <BottomNavigationTab icon={StarIcon}/>,
      <BottomNavigationTab icon={StarIcon}/>,
      <BottomNavigationTab icon={StarIcon}/>,
    ],
  },
};

const iconTitleBottomNavigation: ComponentShowcaseItem = {
  props: {
    children: [
      <BottomNavigationTab icon={StarIcon} title='Tab 1'/>,
      <BottomNavigationTab icon={StarIcon} title='Tab 2'/>,
      <BottomNavigationTab icon={StarIcon} title='Tab 3'/>,
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
  title: 'Bottom Navigation',
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
