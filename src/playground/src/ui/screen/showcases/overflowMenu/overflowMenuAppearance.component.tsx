import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Layout,
  OverflowMenu,
} from 'react-native-ui-kitten';

export class OverflowMenuWithoutDividerShowcase extends React.Component {

  state = {
    menuVisible: false,
    selectedIndex: null,
  };

  data = [
    { title: 'Menu Item 1' },
    { title: 'Menu Item 2' },
    { title: 'Menu Item 3' },
    { title: 'Menu Item 4' },
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
          appearance='noDivider'
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
