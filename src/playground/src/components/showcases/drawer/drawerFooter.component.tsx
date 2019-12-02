import React from 'react';
import { SafeAreaView } from 'react-navigation';
import {
  Drawer,
  DrawerHeaderFooter,
} from '@ui-kitten/components';

const drawerData = [
  { title: 'Dashboard' },
  { title: 'Messages' },
  { title: 'Settings' },
  { title: 'Articles' },
  { title: 'Ecommerce' },
  { title: 'Chat' },
];

const Footer = () => (
  <DrawerHeaderFooter description='Drawer Footer'/>
);

export const DrawerFooterShowcase = () => {

  const onRouteSelect = (index) => {
    const route = drawerData[index];
    // navigate with React Navigation
    // this.props.navigation.navigate(route.title);
  };

  return (
    <SafeAreaView>
      <Drawer
        data={drawerData}
        footer={Footer}
        onSelect={onRouteSelect}
      />
    </SafeAreaView>
  );
};
