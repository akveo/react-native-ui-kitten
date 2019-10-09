import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
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
      <View style={styles.container}>
        <BottomNavigation
          selectedIndex={this.state.selectedIndex}
          onSelect={this.onTabSelect}>
          <BottomNavigationTab
            style={styles.tab}
            titleStyle={styles.tabText}
            title='Dashboard'
          />
          <BottomNavigationTab
            titleStyle={styles.tabText}
            title='Settings'
          />
        </BottomNavigation>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  tab: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
  tabText: {
    color: 'green',
  },
});
