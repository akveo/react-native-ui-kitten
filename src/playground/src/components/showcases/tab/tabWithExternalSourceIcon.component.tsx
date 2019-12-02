import React from 'react';
import { Image } from 'react-native';
import { Tab } from 'react-native-ui-kitten';

const PersonIcon = (style) => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/outline/png/128/person-outline.png' }}
  />
);

export const TabWithExternalSourceIconShowcase = () => (
  <Tab
    title='USERS'
    icon={PersonIcon}
  />
);
