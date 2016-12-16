import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';

import {RkConfig} from 'react-native-ui-kit';
import MessageBase from '../common/Message'

export default class MessageBlur extends MessageBase {

  getStyles(){
    return styles;
  }

}

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: RkConfig.colors.blurBgStrong,
    alignSelf: 'flex-start',
    marginRight: 50,
    padding: 10,
    borderRadius: 20,
    marginVertical: 5
  },
  myMessageContainer: {
    backgroundColor: RkConfig.colors.blurBg,
    alignSelf: 'flex-end',
    marginLeft: 50,
    marginRight: 0
  },
  messageText: {
    fontSize: 14,
    color: RkConfig.colors.blurTextStrong
  }
});