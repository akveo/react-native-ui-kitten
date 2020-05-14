import React from 'react';
import { Menu, MenuItem, Text } from '@ui-kitten/components';

export const MenuNoMarkersShowcase = () => {

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
      <Menu>
        <MenuItem title='Users' onPress={onUsersPress}/>
        <MenuItem title='Orders' onPress={onOrdersPress}/>
        <MenuItem title='Transactions' onPress={onTransactionsPress}/>
        <MenuItem title='Settings' onPress={onSettingsPress}/>
      </Menu>
    </React.Fragment>
  );
};
