/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  Drawer,
  Icon,
  Layout,
} from 'react-native-ui-kitten';

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
    // const { [index]: route } = this.drawerData;
    // navigate with React Navigation
    // this.props.navigation.navigate(route.title);
  };

  render() {
    return (
      <Layout style={styles.container}>
        <SafeAreaView>
          <Drawer
            data={this.drawerData}
            onSelect={this.onRouteSelect}
          />
        </SafeAreaView>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
