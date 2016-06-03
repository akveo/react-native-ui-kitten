import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  TouchableOpacity,
  View,
  DrawerLayoutAndroid,
  Dimensions,
  ToolbarAndroid,
  Image
} from 'react-native';

import {ComponentsScreen} from "./screens/ComponentsScreen";
import {StartScreen} from './screens/StartScreen';

var {height, width} = Dimensions.get('window');
class ExplorerApp extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DrawerLayoutAndroid
        ref={'drawer'}
        drawerWidth={width/2}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <ComponentsScreen
                                      onSelect={this._closeDrawer.bind(this)}
                                      navigator={this.refs['navigator']}/>}>
        <Navigator
          navigationBar={this._getNavBar()}
          ref={'navigator'}
          initialRoute={{
            title: 'Start screen',
            component: StartScreen
          }}
          renderScene={this._renderScene}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
        />
      </DrawerLayoutAndroid>
    );
  }

  _renderScene(route, navigator) {
    return <route.component/>;
  }

  _openDrawer() {
    this.refs['drawer'].openDrawer()
  }

  _closeDrawer() {
    this.refs['drawer'].closeDrawer()
  }

  _getNavBar() {
    return (
      <Navigator.NavigationBar
        routeMapper={this._getNavigationBarRouteMapper()}/>
    );
  }

  _getNavigationBarRouteMapper() {
    return {
      _openDrawer: this._openDrawer.bind(this),

      LeftButton(route, navigator, index, navState) {
        return (
          <TouchableOpacity
            onPress={this._openDrawer}>
            <Image
              source={require('./ic_menu_black_24dp.png')}
              style={{width: 50, height: 50}}/>
          </TouchableOpacity>
        );
      },

      Title(route, navigator, index, navState) {
        return (
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              {route.title}
            </Text>
          </View>
        );
      },

      RightButton() {
        return null;
      }
    };
  }

  state = {
    title: 'Start screen'
  }

}


const styles = StyleSheet.create({
  container: {
    paddingTop: 50
  },
  titleText: {
    fontSize: 26,
  },
  titleContainer: {
    flex:1,
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('ExplorerApp', () => ExplorerApp);
