/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Icon,
  Layout,
  OverflowMenu,
} from 'react-native-ui-kitten';

const StarIcon = (style) => (
  <Icon {...style} name='star'/>
);

export class OverflowMenuWithIconsShowcase extends React.Component {

  state = {
    menuVisible: false,
    selectedIndex: null,
  };

  data = [
    { title: 'Menu Item 1', icon: StarIcon },
    { title: 'Menu Item 2', icon: StarIcon },
    { title: 'Menu Item 3', icon: StarIcon },
    { title: 'Menu Item 4', icon: StarIcon },
  ];

  onItemSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  onToggleButtonPress = () => {
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
          onBackdropPress={this.onToggleButtonPress}>
          <Button onPress={this.onToggleButtonPress}>
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
