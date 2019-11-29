/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import {
  BottomNavigationTab,
  Icon,
} from 'react-native-ui-kitten';

const DashboardIcon = (style) => (
  <Icon {...style} name='layout'/>
);

export const BottomNavigationTabWithIconShowcase = () => (
  <BottomNavigationTab
    title='DASHBOARD'
    icon={DashboardIcon}
  />
);
