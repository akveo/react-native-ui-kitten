import React from 'react';
import { Menu } from 'react-native-ui-kitten';

export class MenuSimpleUsageShowcase extends React.Component {

  state = {
    selectedIndex: null,
  };

  data = [
    { title: 'Item 1' },
    { title: 'Item 2', disabled: true },
    { title: 'Item 3' },
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
