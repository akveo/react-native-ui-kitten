import React from 'react';
import { Image } from 'react-native';
import { DrawerHeaderFooter } from 'react-native-ui-kitten';

const ProfileIcon = (style) => (
  <Image style={style} source={{uri: 'https://akveo.github.io/eva-icons/fill/png/128/person.png'}}/>
);

export const DrawerHeaderFooterWithExternalSourceIconShowcase = () => (
  <DrawerHeaderFooter
    title='John Doe'
    description='React Native Developer'
    icon={ProfileIcon}
  />
);
