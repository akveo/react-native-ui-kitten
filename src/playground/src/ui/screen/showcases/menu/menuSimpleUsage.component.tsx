import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Menu } from 'react-native-ui-kitten';

export class MenuSimpleUsageShowcase extends React.Component {

  state = {
    selectedIndex: null,
  };

  data = [
    { title: 'Item 1' },
    { title: 'Item 2' },
    { title: 'Item 3', disabled: true },
    { title: 'Item 4' },
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
});
