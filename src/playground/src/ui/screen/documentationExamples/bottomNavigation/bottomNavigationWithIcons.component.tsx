// IMPORTANT: To use Icon component make sure to follow this guide:
// https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from 'react-native-ui-kitten';

const DashboardIcon = (style) => (
  <Icon {...style} name='layout'/>
);

const SettingsIcon = (style) => (
  <Icon {...style} name='settings'/>
);

const MessagesIcon = (style) => (
  <Icon {...style} name='message-circle'/>
);

export class BottomNavigationWithIconsShowcase extends React.Component {

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
            title='Dashboard'
            icon={DashboardIcon}
          />
          <BottomNavigationTab
            title='Settings'
            icon={SettingsIcon}
          />
          <BottomNavigationTab
            title='Messages'
            icon={MessagesIcon}
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
});
