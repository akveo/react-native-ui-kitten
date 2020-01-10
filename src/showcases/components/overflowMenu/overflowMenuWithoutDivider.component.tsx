import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Layout,
  OverflowMenu,
} from '@ui-kitten/components';

const data = [
  { title: 'Menu Item 1' },
  { title: 'Menu Item 2' },
  { title: 'Menu Item 3' },
  { title: 'Menu Item 4' },
];

export const OverflowMenuWithoutDividerShowcase = () => {

  const [menuVisible, setMenuVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setMenuVisible(false);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <Layout style={styles.container}>
      <OverflowMenu
        appearance='noDivider'
        data={data}
        visible={menuVisible}
        selectedIndex={selectedIndex}
        onSelect={onItemSelect}
        onBackdropPress={toggleMenu}>
        <Button onPress={toggleMenu}>
          TOGGLE MENU
        </Button>
      </OverflowMenu>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 256,
  },
});
