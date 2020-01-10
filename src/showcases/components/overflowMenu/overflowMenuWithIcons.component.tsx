/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Icon,
  Layout,
  OverflowMenu,
} from '@ui-kitten/components';

const StarIcon = (style) => (
  <Icon {...style} name='star'/>
);

const data = [
  {
    title: 'Menu Item 1',
    icon: StarIcon,
  },
  {
    title: 'Menu Item 2',
    icon: StarIcon,
  },
  {
    title: 'Menu Item 3',
    icon: StarIcon,
  },
  {
    title: 'Menu Item 4',
    icon: StarIcon,
  },
];

export const OverflowMenuWithIconsShowcase = () => {

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
