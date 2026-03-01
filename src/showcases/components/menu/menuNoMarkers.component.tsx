import React from 'react';
import { Menu, MenuItem, Text } from '@ui-kitten/components';

export const MenuNoMarkersShowcase = (): React.ReactElement => {

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
      <Menu>
        <MenuItem
          title='Users'
          onPress={onUsersPress}
        />
        <MenuItem
          title='Orders'
          onPress={onOrdersPress}
        />
        <MenuItem
          title='Transactions'
          onPress={onTransactionsPress}
        />
        <MenuItem
          title='Settings'
          onPress={onSettingsPress}
        />
      </Menu>
    </>
  );
};
