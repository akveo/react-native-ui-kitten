import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import Init from './app/util/Setup'
import ScreenService from './app/util/ScreenService'

class BoomApp extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Navigator
        style={{flex: 1}}
        navigationBarHidden={true}
        initialRoute={{screen: ScreenService.getLoginScreen()}}
        renderScene={(route, navigator) =>{
          return  <route.screen navigator={navigator} {...route.passProps} />
        }}
      />
    );
  }
}


AppRegistry.registerComponent('BoomApp', () => BoomApp);
