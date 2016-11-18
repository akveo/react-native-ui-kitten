import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  Image
} from 'react-native';

import {RkConfig, RkBarBg, RkTabView} from 'react-native-ui-kit';
import MainScreenBase from '../base/MainScreenBase';

export default class MainScreenBlur extends MainScreenBase {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="light-content"
        />
        <Image
          source={require('../../../img/bg/blurBg.png')}
          style={RkConfig.styles.backgroundImage}>
          {super.renderTabBar({
            tintColor: RkConfig.colors.white,
            barTintColor: RkConfig.colors.black
          })}
        </Image>
        <RkBarBg style={{backgroundColor: RkConfig.colors.blurBgStrong}}/>
      </View>
    );
  }
}


