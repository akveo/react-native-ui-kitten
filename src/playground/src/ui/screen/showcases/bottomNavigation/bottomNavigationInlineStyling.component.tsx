import React from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten';

export class BottomNavigationInlineStylingShowcase extends React.Component {

  state = {
    selectedIndex: 0,
  };

  onTabSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <BottomNavigation
        style={styles.bottomNavigation}
        indicatorStyle={styles.indicator}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onTabSelect}>
        <BottomNavigationTab title='DASHBOARD'/>
        <BottomNavigationTab title='SETTINGS'/>
      </BottomNavigation>
    );
  }
}

const styles = StyleSheet.create({
  bottomNavigation: { backgroundColor: 'white' },
  indicator: { backgroundColor: 'black' },
});
