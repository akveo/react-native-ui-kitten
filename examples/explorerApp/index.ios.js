import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  StatusBar,
  View
} from 'react-native';

import {RkTheme} from 'react-native-ui-kitten';
import {ComponentsScreen} from "./screens/ComponentsScreen";
import {bootstrap} from "./style/themeBootstrapper"

bootstrap();
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
