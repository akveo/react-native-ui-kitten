import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  StatusBar,
  View
} from 'react-native';

import {RkTheme} from 'react-native-ui-kitten';
import {BlueTheme, RedTheme} from "./style/my-theme"
RkTheme.setType('RkTab','selected-gray',{
  backgroundColor: '#e0e0e0',
  color:'#2196f3'
});

//RkTheme.setTheme(BlueTheme);

import {ComponentsScreen} from "./screens/ComponentsScreen";

class ExplorerApp extends Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <NavigatorIOS
          style={styles.container}
          barTintColor={RkTheme.current.colors.background.default}
          titleTextColor= {RkTheme.current.colors.text.default}
          tintColor= {RkTheme.current.colors.text.default}

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
    flex: 1
  }
});

AppRegistry.registerComponent('ExplorerApp', () => ExplorerApp);
