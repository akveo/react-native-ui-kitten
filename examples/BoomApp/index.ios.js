/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS
} from 'react-native';

import ScreenService from './app/ScreenService'

class BoomApp extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <NavigatorIOS //TODO user cross platform Navigator
        style={{flex: 1}}
        navigationBarHidden={true}
        initialRoute={{
        title: '',
        component: ScreenService.getLoginScreen(true),
        }}
      />
    );
  }
}


AppRegistry.registerComponent('BoomApp', () => BoomApp);
