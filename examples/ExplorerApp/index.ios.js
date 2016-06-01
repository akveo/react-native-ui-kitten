import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} from 'react-native';

import {ComponentsScreen} from "./screens/ComponentsScreen";

class ExplorerApp extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Ui KIT',
          component: ComponentsScreen,
        }}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

AppRegistry.registerComponent('ExplorerApp', () => ExplorerApp);
