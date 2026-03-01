import React from 'react';
import { Drawer, DrawerItem, Text } from '@ui-kitten/components';

export const DrawerNoMarkersShowcase = (): React.ReactElement => {

  const [selectedTitle, setSelectedTitle] = React.useState('No items selected');

  const onUsersPress = (): void => {
    setSelectedTitle('Users');
  };

  const onOrdersPress = (): void => {
    setSelectedTitle('Orders');
  };

  const onTransactionsPress = (): void => {
    setSelectedTitle('Transactions');
  };

  const onSettingsPress = (): void => {
    setSelectedTitle('Settings');
  };

  return (
    <>
      <Text category='h6'>
        {selectedTitle}
      </Text>
      <Drawer>
        <DrawerItem
          title='Users'
          onPress={onUsersPress}
        />
        <DrawerItem
          title='Orders'
          onPress={onOrdersPress}
        />
        <DrawerItem
          title='Transactions'
          onPress={onTransactionsPress}
        />
        <DrawerItem
          title='Settings'
          onPress={onSettingsPress}
        />
      </Drawer>
    </>
  );
};
