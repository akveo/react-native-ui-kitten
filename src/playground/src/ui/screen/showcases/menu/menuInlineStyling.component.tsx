import React from 'react';
import { StyleSheet } from 'react-native';
import { Menu } from 'react-native-ui-kitten';

export class MenuInlineStylingShowcase extends React.Component {

  state = {
    selectedIndex: null,
  };

  data = [
    {
      title: 'Item 1',
      titleStyle: styles.menuItemTitle,
    },
    { title: 'Item 2' },
    {
      title: 'Item 3',
      titleStyle: styles.menuItemTitle,
    },
    { title: 'Item 4' },
  ];

  onSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <Menu
        data={this.data}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onSelect}
      />
    );
  }
}

const styles = StyleSheet.create({
  menuItemTitle: {
    color: 'black',
    fontSize: 18,
  },
});
