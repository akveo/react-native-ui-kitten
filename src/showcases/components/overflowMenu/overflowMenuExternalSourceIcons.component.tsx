import React from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';
import {
  Button,
  Layout,
  OverflowMenu,
} from '@ui-kitten/components';

const RemoteStarIcon = (style) => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
  />
);

const data = [
  {
    title: 'Menu Item 1',
    icon: RemoteStarIcon,
  },
  {
    title: 'Menu Item 2',
    icon: RemoteStarIcon,
  },
  {
    title: 'Menu Item 3',
    icon: RemoteStarIcon,
  },
  {
    title: 'Menu Item 4',
    icon: RemoteStarIcon,
  },
];

export const OverflowMenuExternalSourceIconsShowcase = () => {

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
