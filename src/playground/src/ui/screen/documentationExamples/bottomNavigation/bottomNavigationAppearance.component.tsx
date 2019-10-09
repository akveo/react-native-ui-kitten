import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten';

export class BottomNavigationAppearanceShowcase extends React.Component {

  state = {
    selectedIndex: 0,
  };

  onTabSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <View style={styles.container}>
        <BottomNavigation
          appearance='noIndicator'
          selectedIndex={this.state.selectedIndex}
          onSelect={this.onTabSelect}>
          <BottomNavigationTab title='Dashboard'/>
          <BottomNavigationTab title='Settings'/>
          <BottomNavigationTab title='Messages'/>
        </BottomNavigation>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
