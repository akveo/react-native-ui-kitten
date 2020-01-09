import React from 'react';
import { Image } from 'react-native';
import { TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (style) => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/arrow-back.png' }}
  />
);

export const TopNavigationActionExternalSourceIconShowcase = () => (
  <TopNavigationAction icon={BackIcon}/>
);
