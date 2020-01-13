/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import { SafeAreaView } from 'react-navigation';
import {
  Drawer,
  Icon,
} from '@ui-kitten/components';

const PersonIcon = (style) => (
  <Icon {...style} name='person-outline'/>
);

const BellIcon = (style) => (
  <Icon {...style} name='bell-outline'/>
);

const EmailIcon = (style) => (
  <Icon {...style} name='email-outline'/>
);

const drawerData = [
  {
    title: 'Users',
    icon: PersonIcon,
  },
  {
    title: 'Orders',
    icon: BellIcon,
  },
  {
    title: 'Transactions',
    icon: EmailIcon,
  },
];

export const DrawerWithIconsShowcase = () => {

  const onRouteSelect = (index) => {
    const route = drawerData[index];
    // navigate with React Navigation
    // this.props.navigation.navigate(route.title);
  };

  return (
    <SafeAreaView>
      <Drawer
        data={drawerData}
        onSelect={onRouteSelect}
      />
    </SafeAreaView>
  );
};
