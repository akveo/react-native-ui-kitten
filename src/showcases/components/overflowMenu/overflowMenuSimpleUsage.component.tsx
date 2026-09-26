import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, MenuItem, OverflowMenu, Text } from '@ui-kitten/components';

export const OverflowMenuSimpleUsageShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  const onItemSelect = (index): void => {
    setSelectedIndex(index);
    setVisible(false);
  };

  const renderToggleButton = (): React.ReactElement => (
    <Button testID='overflow-menu-anchor' onPress={() => setVisible(true)}>
      TOGGLE MENU
    </Button>
  );

  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <Text testID='overflow-menu-value'>{`Selected: ${selectedIndex ? selectedIndex.row + 1 : 'none'}`}</Text>
      <OverflowMenu
        testID='overflow-menu'
        anchor={renderToggleButton}
        visible={visible}
        selectedIndex={selectedIndex}
        onSelect={onItemSelect}
        onBackdropPress={() => setVisible(false)}
      >
        <MenuItem testID='overflow-menu-item-1' title='Users' />
        <MenuItem testID='overflow-menu-item-2' title='Orders' />
        <MenuItem testID='overflow-menu-item-3' title='Transactions' />
      </OverflowMenu>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 144,
  },
});

