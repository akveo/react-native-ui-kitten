/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons
 */

import React from 'react';
import {
  Icon,
  Tab,
} from 'react-native-ui-kitten';

const PersonIcon = (style) => (
  <Icon {...style} name='person-outline'/>
);

export const TabWithIconShowcase = () => (
  <Tab
    title='USERS'
    icon={PersonIcon}
  />
);
