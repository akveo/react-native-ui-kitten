import React from 'react';
import { Image } from 'react-native';
import { ListItem } from '@ui-kitten/components';

const RemoteStarIcon = (style) => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
  />
);

export const ListItemWithExternalIconShowcase = (props) => (
  <ListItem
    title='Title'
    description='Description'
    icon={RemoteStarIcon}
  />
);
