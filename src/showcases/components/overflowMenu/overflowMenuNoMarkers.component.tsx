import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, MenuItem, OverflowMenu, Text } from '@ui-kitten/components';

export const OverflowMenuNoMarkersShowcase = () => {

  const [visible, setVisible] = React.useState(false);
  const [selectedTitle, setSelectedTitle] = React.useState('No items selected');

  const onUsersPress = ({ index }) => {
    setSelectedTitle('Users');
    setVisible(false);
  };

  const onOrdersPress = ({ index }) => {
    setSelectedTitle('Orders');
    setVisible(false);
  };

  const onTransactionsPress = ({ index }) => {
    setSelectedTitle('Transactions');
    setVisible(false);
  };

  const onSettingsPress = ({ index }) => {
    setSelectedTitle('Settings');
    setVisible(false);
  };

  const renderToggleButton = () => (
    <Button onPress={() => setVisible(true)}>
      TOGGLE MENU
    </Button>
  );

  return (
    <Layout style={styles.container} level='1'>
      <Text category='h6'>{selectedTitle}</Text>
      <OverflowMenu
        visible={visible}
        anchor={renderToggleButton}
        onBackdropPress={() => setVisible(false)}>
        <MenuItem title='Users' onPress={onUsersPress}/>
        <MenuItem title='Orders' onPress={onOrdersPress}/>
        <MenuItem title='Transactions' onPress={onTransactionsPress}/>
      </OverflowMenu>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 144,
  },
});
