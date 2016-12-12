import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  StatusBar,
  View
} from 'react-native';

import {ComponentsScreen} from "./screens/ComponentsScreen";
import {RkConfig} from 'react-native-ui-kit';

class ExplorerApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <NavigatorIOS
          style={styles.container}
          barTintColor={RkConfig.colors.primary}
          titleTextColor= {RkConfig.colors.white}
          tintColor= {RkConfig.colors.white}
          initialRoute={{
            title: 'Ui KIT',
            component: ComponentsScreen
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('ExplorerApp', () => ExplorerApp);
