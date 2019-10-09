import React from 'react';
import {
  Button,
  OverflowMenu,
} from 'react-native-ui-kitten';

export class OverflowMenuSimpleUsageShowcase extends React.Component {

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
    this.setState({ selectedIndex });
  };

  onToggleButtonPress = () => {
    const menuVisible = !this.state.menuVisible;
    this.setState({ menuVisible });
  };

  render() {
    return (
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
    );
  }
}
