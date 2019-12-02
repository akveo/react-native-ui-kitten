/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import {
  Icon,
  ListItem,
} from '@ui-kitten/components';

const StarIcon = (style) => (
  <Icon {...style} name='star'/>
);

export const ListItemWithIconShowcase = () => (
  <ListItem
    title='Title'
    description='Description'
    icon={StarIcon}
  />
);
