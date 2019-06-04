import React from 'react';
import {
  Avatar,
  AvatarProps,
} from '@kitten/ui';

export const AvatarShowcase = (props?: AvatarProps): React.ReactElement<AvatarProps> => {
  return (
    <Avatar
      {...props}
      source={{ uri: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/7790309/cena.jpg' }}
    />
  );
};
