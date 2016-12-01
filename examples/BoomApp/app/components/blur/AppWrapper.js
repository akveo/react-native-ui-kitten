import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  StatusBar
} from 'react-native';

import {RkConfig, RkBarBg} from 'react-native-ui-kit';

export default class AppWrapper extends Component {

  static tabProps={
    tintColor: RkConfig.colors.white,
    barTintColor: RkConfig.colors.black
  };

  render(){
    return(
    <Image
      source={require('../../../img/blurBg.png')}
      style={RkConfig.styles.backgroundImage}>
      {this.props.children}
      <StatusBar
        barStyle="light-content"
      />
      <RkBarBg style={styles.bar}/>
    </Image>
    )
  }

}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: RkConfig.colors.blurBg
  },
});
