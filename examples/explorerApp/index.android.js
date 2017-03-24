import React, {Component} from 'react';
import {
  AppRegistry,
  StatusBar,
  Navigator,
  View,
  Text,
  Title,
  StyleSheet,
  ToolbarAndroid,
  TouchableOpacity
} from 'react-native';

import {ComponentsScreen} from "./screens/ComponentsScreen";
import {AndroidBack} from './components/navigation/AndroidBack'
import {RkTheme} from 'react-native-ui-kitten';
import {bootstrap} from "./style/themeBootstrapper"

bootstrap();

class ExplorerApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'Start screen'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={RkTheme.colors.blue900}
          barStyle="default"
        />
        {this._renderNavigator()}
      </View>
    );
  };

  _renderToolbar(route, navigator) {
    let icon = null;

    if (this._hasScenesInStack(navigator)) {
      icon = backImage;
    }

    return (
      <View>
        <ToolbarAndroid
          onIconClicked={() => {
            if (this._hasScenesInStack(navigator)) {
              navigator.pop();
            }
          }}
          navIcon={icon}
          titleColor={RkTheme.colors.white}
          style={styles.toolbar}
          title={route.title}/>
        <AndroidBack route={route} navigator={navigator}/>
      </View>
    )
  }

  _renderNavigator() {
    return (<Navigator
      renderScene={this._renderScene.bind(this)}
      configureScene={(route) => {
        if (route.sceneConfig) {
          return route.sceneConfig;
        }

        return Navigator.SceneConfigs.FloatFromRight;
      }}
      initialRoute={{
        title: this.state.title,
        component: ComponentsScreen,
      }}
    />)
  }

  _renderScene(route, navigator) {
    return (
      <View style={styles.container}>
        {this._renderToolbar(route, navigator)}
        <route.component index={route.index} navigator={navigator} data={route.data}/>
      </View>)
  };

  _hasScenesInStack(navigator) {
    return navigator && navigator.getCurrentRoutes().length > 1;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    height: 56,
    backgroundColor: RkTheme.colors.blue800
  }
});

const backImage = {uri: "back"};

AppRegistry.registerComponent('ExplorerApp', () => ExplorerApp);