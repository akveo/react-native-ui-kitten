import React from 'react';
import {
  Avatar,
  AvatarElement,
  AvatarProps,
} from '@kitten/ui';

export const AvatarShowcase = (props?: AvatarProps): AvatarElement => {
  return (
    <Avatar
      {...props}
      source={{ uri: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/7790309/cena.jpg' }}
    />
  );
};
