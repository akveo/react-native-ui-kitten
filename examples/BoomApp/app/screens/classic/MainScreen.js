import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  StatusBar
} from 'react-native';

import {RkConfig, RkBarBg, RkTabView} from 'react-native-ui-kit';
import MainScreenBase from "../base/MainScreenBase";

export default class MainScreen extends MainScreenBase {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="light-content"
          />
        {super.renderTabBar()}
        <RkBarBg/>
      </View>
    );
  }
}


