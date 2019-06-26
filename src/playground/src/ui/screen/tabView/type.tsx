import React from 'react';
import {
  Image,
  ImageProps,
} from 'react-native';
import { StyleType } from '@kitten/theme';
import {
  Tab,
  Text,
  Layout,
} from '@kitten/ui';
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
      <Tab title='Tab 1'>
        <Layout>
          <Text>Tab 1</Text>
        </Layout>
      </Tab>,
      <Tab title='Tab 2'>
        <Layout>
          <Text>Tab 2</Text>
        </Layout>
      </Tab>,
      <Tab title='Tab 3'>
        <Layout>
          <Text>Tab 3</Text>
        </Layout>
      </Tab>,
    ],
  },
};

const iconBottomNavigation: ComponentShowcaseItem = {
  props: {
    children: [
      <Tab icon={Icon}>
        <Layout>
          <Text>Tab 1</Text>
        </Layout>
      </Tab>,
      <Tab icon={Icon}>
        <Layout>
          <Text>Tab 2</Text>
        </Layout>
      </Tab>,
      <Tab icon={Icon}>
        <Layout>
          <Text>Tab 3</Text>
        </Layout>
      </Tab>,
    ],
  },
};

const iconTitleBottomNavigation: ComponentShowcaseItem = {
  props: {
    children: [
      <Tab icon={Icon} title='Tab 1'>
        <Layout>
          <Text>Tab 1</Text>
        </Layout>
      </Tab>,
      <Tab icon={Icon} title='Tab 2'>
        <Layout>
          <Text>Tab 2</Text>
        </Layout>
      </Tab>,
      <Tab icon={Icon} title='Tab 3'>
        <Layout>
          <Text>Tab 3</Text>
        </Layout>
      </Tab>,
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
