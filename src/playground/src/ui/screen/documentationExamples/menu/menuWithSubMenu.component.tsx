import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Menu } from 'react-native-ui-kitten';

export class MenuWithSubMenuShowcase extends React.Component {

  state = {
    selectedIndex: null,
  };

  data = [
    { title: 'Item 1' },
    {
      title: 'Item 2',
      subItems: [
        { title: 'Item 21' },
        { title: 'Item 22' },
        { title: 'Item 23' },
      ],
    },
    { title: 'Item 3' },
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
