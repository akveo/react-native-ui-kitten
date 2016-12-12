import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View,
  DrawerLayoutAndroid,
  Dimensions,
  ToolbarAndroid,
} from 'react-native';

import {ComponentsScreen} from "./screens/ComponentsScreen";
import {StartScreen} from './screens/StartScreen';

let {height, width} = Dimensions.get('window');
let toolBarHeight = 56;
let maxDrawerWidth = 400;
let drawerWidth = width - toolBarHeight > maxDrawerWidth ? maxDrawerWidth :  width - toolBarHeight;

class ExplorerApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Start screen'
    };
  }

  render() {
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this.drawer = drawer; }}
        drawerWidth={drawerWidth}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <ComponentsScreen
          onSelect={(component) => {
            this.drawer.closeDrawer();
            this.setState({title: component.title});
          }}
          navigator={this.navigator}/>}>
        {this._renderApp()}
      </DrawerLayoutAndroid>
    );
  }

  _renderApp(){
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          ref={(toolbar) => { this.toolbar = toolbar; }}
          navIcon={require('image!ic_menu_black_24dp')}
          onIconClicked={() => this.drawer.openDrawer()}
          style={styles.toolbar}
          title={this.state.title}/>
        <Navigator
          ref={(navigator) => { this.navigator = navigator; }}
          initialRoute={{
            title: 'Start screen',
            component: StartScreen
          }}
          renderScene={(route) => <route.component/>}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
        />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#E9EAED',
    height: toolBarHeight,
  },
});

AppRegistry.registerComponent('ExplorerApp', () => ExplorerApp);
