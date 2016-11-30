import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import Init from './app/util/Setup'
import ThemeService from './app/util/ThemeService'

class BoomApp extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Navigator
        style={{flex: 1}}
        navigationBarHidden={true}
        initialRoute={{screen: ThemeService.getLoginScreen()}}
        renderScene={(route, navigator) =>{
          return  <route.screen navigator={navigator} {...route.passProps} />
        }}
      />
    );
  }
}


AppRegistry.registerComponent('BoomApp', () => BoomApp);
