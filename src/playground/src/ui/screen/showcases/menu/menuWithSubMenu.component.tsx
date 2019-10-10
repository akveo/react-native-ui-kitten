import React from 'react';
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
        { title: 'Sub Item 1' },
        { title: 'Sub Item 2' },
      ],
    },
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
