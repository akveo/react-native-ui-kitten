/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import { Image } from 'react-native';
import {
  BottomNavigationTab,
  Icon,
  Layout,
} from '@ui-kitten/components';

const PersonIcon = (style) => (
  <Icon {...style} name='person'/>
);

const RemotePersonIcon = (style) => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/person.png' }}
  />
);

export const BottomNavigationTabWithIconShowcase = () => (
  <Layout>

    <BottomNavigationTab title='EVA ICON' icon={PersonIcon}/>

    <BottomNavigationTab title='REMOTE EVA ICON' icon={RemotePersonIcon}/>

  </Layout>
);
