// IMPORTANT: To use Icon component make sure to follow this guide:
// https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons

import React from 'react';
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

export class BottomNavigationWithIconsShowcase extends React.Component {

  state = {
    selectedIndex: 0,
  };

  onTabSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <BottomNavigation
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onTabSelect}>
        <BottomNavigationTab
          title='DASHBOARD'
          icon={DashboardIcon}
        />
        <BottomNavigationTab
          title='SETTINGS'
          icon={SettingsIcon}
        />
      </BottomNavigation>
    );
  }
}
