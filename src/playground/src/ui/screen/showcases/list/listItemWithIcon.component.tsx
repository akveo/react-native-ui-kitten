/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import {
  Icon,
  ListItem,
} from 'react-native-ui-kitten';

const StarIcon = (style) => (
  <Icon {...style} name='star'/>
);

export const ListItemWithIconShowcase = (props) => (
  <ListItem
    title='Title'
    description='Description'
    icon={StarIcon}
  />
);
