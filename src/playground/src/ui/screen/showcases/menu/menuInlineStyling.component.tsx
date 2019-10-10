import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Menu } from 'react-native-ui-kitten';

export class MenuInlineStylingShowcase extends React.Component {

  state = {
    selectedIndex: null,
  };

  data = [
    { title: 'Item 1', titleStyle: styles.menuItemTitle },
    { title: 'Item 2' },
    { title: 'Item 3', titleStyle: styles.menuItemTitle },
  ];

  onSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <View style={styles.container}>
        <Menu
          data={this.data}
          selectedIndex={this.state.selectedIndex}
          onSelect={this.onSelect}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  menuItemTitle: {
    color: 'black',
    fontSize: 18,
  },
});
