// IMPORTANT: To use Icon component make sure to follow this guide:
// https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  Drawer,
  Icon,
} from 'react-native-ui-kitten';
import { createDrawerNavigator } from 'react-navigation-drawer';

const DashboardIcon = (style) => (
  <Icon {...style} name='layout'/>
);

const MessagesIcon = (style) => (
  <Icon {...style} name='email'/>
);

const SettingsIcon = (style) => (
  <Icon {...style} name='settings'/>
);

export class DrawerWithIconsShowcase extends React.Component {

  drawerData = [
    { title: 'Dashboard', icon: DashboardIcon },
    { title: 'Messages', icon: MessagesIcon },
    { title: 'Settings', icon: SettingsIcon },
  ];

  onRouteSelect = (index) => {
    const { [index]: route } = this.drawerData;
    // here you can handle route selecting after component will be interrated with the
    // navigation library
    // this.props.navigation.navigate(route.title);
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Drawer
            data={this.drawerData}
            onSelect={this.onRouteSelect}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
