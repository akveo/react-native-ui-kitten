import React from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';
import {
  Button,
  Layout,
  OverflowMenu,
} from 'react-native-ui-kitten';

const RemoteStarIcon = (style) => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
  />
);

export class OverflowMenuExternalSourceIconsShowcase extends React.Component {

  state = {
    menuVisible: false,
    selectedIndex: null,
  };

  data = [
    { title: 'Menu Item 1', icon: RemoteStarIcon },
    { title: 'Menu Item 2', icon: RemoteStarIcon },
    { title: 'Menu Item 3', icon: RemoteStarIcon },
    { title: 'Menu Item 4', icon: RemoteStarIcon },
  ];

  onItemSelect = (selectedIndex) => {
    this.setState({ selectedIndex }, this.toggleMenu);
  };

  toggleMenu = () => {
    const menuVisible = !this.state.menuVisible;
    this.setState({ menuVisible });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <OverflowMenu
          data={this.data}
          visible={this.state.menuVisible}
          selectedIndex={this.state.selectedIndex}
          onSelect={this.onItemSelect}
          onBackdropPress={this.toggleMenu}>
          <Button onPress={this.toggleMenu}>
            TOGGLE MENU
          </Button>
        </OverflowMenu>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 256,
  },
});
