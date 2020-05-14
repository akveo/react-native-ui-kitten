import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Layout, MenuItem, OverflowMenu } from '@ui-kitten/components';

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

export const OverflowMenuAccessoriesShowcase = () => {

  const [visible, setVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const onSelect = (index) => {
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
        visible={visible}
        selectedIndex={selectedIndex}
        onSelect={onSelect}
        onBackdropPress={() => setVisible(false)}>
        <MenuItem title='Users' accessoryLeft={StarIcon}/>
        <MenuItem title='Orders' accessoryLeft={StarIcon}/>
        <MenuItem title='Transactions' accessoryLeft={StarIcon}/>
      </OverflowMenu>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 144,
  },
});
