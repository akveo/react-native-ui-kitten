import React from 'react';
import {
  Avatar,
  AvatarElement,
  AvatarProps,
} from 'react-native-ui-kitten';

export const AvatarShowcase = (props?: AvatarProps): AvatarElement => (
  <Avatar
    {...props}
    source={require('../../assets/images/brand-logo.png')}
  />
);
