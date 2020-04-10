import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, MenuItem, OverflowMenu } from '@ui-kitten/components';

const data = [
  { title: 'Menu Item 1' },
  { title: 'Menu Item 2' },
  { title: 'Menu Item 3' },
  { title: 'Menu Item 4' },
];

export const OverflowMenuStyledBackdropShowcase = () => {

  const [visible, setVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setVisible(false);
  };

  const renderToggleButton = () => (
    <Button onPress={() => setVisible(true)}>
      TOGGLE MENU
    </Button>
  );

  return (
    <Layout style={styles.container} level='1'>
      <OverflowMenu
        anchor={renderToggleButton}
        backdropStyle={styles.backdrop}
        visible={visible}
        selectedIndex={selectedIndex}
        onSelect={onItemSelect}
        onBackdropPress={() => setVisible(false)}>
        <MenuItem title='Users'/>
        <MenuItem title='Orders'/>
        <MenuItem title='Transactions'/>
      </OverflowMenu>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 144,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

