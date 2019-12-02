/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import { SafeAreaView } from 'react-navigation';
import {
  Drawer,
  DrawerHeaderFooter,
  Icon,
} from '@ui-kitten/components';

const PersonIcon = (style) => (
  <Icon {...style} name='person'/>
);

const Header = () => (
  <DrawerHeaderFooter
    title='John Doe'
    description='React Native Developer'
    icon={PersonIcon}
  />
);

const drawerData = [
  { title: 'Dashboard' },
  { title: 'Messages' },
  { title: 'Settings' },
  { title: 'Articles' },
  { title: 'Ecommerce' },
  { title: 'Chat' },
];

export const DrawerHeaderShowcase = () => {

  const onRouteSelect = (index) => {
    const route = drawerData[index];
    // navigate with React Navigation
    // this.props.navigation.navigate(route.title);
  };

  return (
    <SafeAreaView>
      <Drawer
        data={drawerData}
        header={Header}
        onSelect={onRouteSelect}
      />
    </SafeAreaView>
  );
};
