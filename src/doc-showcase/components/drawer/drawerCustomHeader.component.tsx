import React from 'react';
import { SafeAreaView } from 'react-navigation';
import {
  Drawer,
  Layout,
  Text,
} from '@ui-kitten/components';

const drawerData = [
  { title: 'Dashboard' },
  { title: 'Messages' },
  { title: 'Settings' },
  { title: 'Articles' },
  { title: 'Ecommerce' },
  { title: 'Chat' },
];

const Header = () => (
  <Layout level='2'>
    <Text category='h6'>Drawer Header</Text>
  </Layout>
);

export const DrawerCustomHeaderShowcase = () => {

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
