import React from 'react';
import { Drawer, DrawerItem, Text } from '@ui-kitten/components';

export const DrawerNoMarkersShowcase = () => {

  const [selectedTitle, setSelectedTitle] = React.useState('No items selected');

  const onUsersPress = ({ index }) => {
    setSelectedTitle('Users');
  };

  const onOrdersPress = ({ index }) => {
    setSelectedTitle('Orders');
  };

  const onTransactionsPress = ({ index }) => {
    setSelectedTitle('Transactions');
  };

  const onSettingsPress = ({ index }) => {
    setSelectedTitle('Settings');
  };

  return (
    <React.Fragment>
      <Text category='h6'>{selectedTitle}</Text>
      <Drawer>
        <DrawerItem title='Users' onPress={onUsersPress}/>
        <DrawerItem title='Orders' onPress={onOrdersPress}/>
        <DrawerItem title='Transactions' onPress={onTransactionsPress}/>
        <DrawerItem title='Settings' onPress={onSettingsPress}/>
      </Drawer>
    </React.Fragment>
  );
};
