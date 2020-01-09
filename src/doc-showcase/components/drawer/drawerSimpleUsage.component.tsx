import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { Drawer } from '@ui-kitten/components';

const drawerData = [
  { title: 'Dashboard' },
  { title: 'Messages' },
  { title: 'Settings' },
  { title: 'Articles' },
  { title: 'Ecommerce' },
  { title: 'Chat' },
];

export const DrawerSimpleUsageShowcase = () => {

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
