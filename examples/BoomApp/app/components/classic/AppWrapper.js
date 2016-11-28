import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';

import {RkConfig, RkBarBg} from 'react-native-ui-kit';

export default class AppWrapper extends Component {

  render(){
    return(
      <View style={styles.wrapper}>
        {this.props.children}
        <StatusBar
          barStyle="light-content"
        />
        <RkBarBg/>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  wrapper: {
   flex: 1,
   backgroundColor: RkConfig.colors.lightGray
  },
});