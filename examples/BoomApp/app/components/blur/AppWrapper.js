import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  StatusBar
} from 'react-native';

import {RkConfig, RkBarBg} from 'react-native-ui-kit';

export default class AppWrapper extends Component {

  render(){
    return(
    <Image
      source={require('../../../img/bg/blurBg.png')}
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
    backgroundColor: RkConfig.colors.blurBgStrong
  },
});
