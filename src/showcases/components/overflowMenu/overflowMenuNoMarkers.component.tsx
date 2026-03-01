import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, MenuItem, OverflowMenu, Text } from '@ui-kitten/components';

export const OverflowMenuNoMarkersShowcase = (): React.ReactElement => {

  const [visible, setVisible] = React.useState(false);
  const [selectedTitle, setSelectedTitle] = React.useState('No items selected');

  const onUsersPress = (): void => {
    setSelectedTitle('Users');
    setVisible(false);
  };

  const onOrdersPress = (): void => {
    setSelectedTitle('Orders');
    setVisible(false);
  };

  const onTransactionsPress = (): void => {
    setSelectedTitle('Transactions');
    setVisible(false);
  };

  const renderToggleButton = (): React.ReactElement => (
    <Button onPress={() => setVisible(true)}>
      TOGGLE MENU
    </Button>
  );

  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <Text category='h6'>
        {selectedTitle}
      </Text>
      <OverflowMenu
        visible={visible}
        anchor={renderToggleButton}
        onBackdropPress={() => setVisible(false)}
      >
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
      </OverflowMenu>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 144,
  },
});
