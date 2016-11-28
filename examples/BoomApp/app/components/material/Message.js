import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';

import {RkConfig} from 'react-native-ui-kit';
import MessageBase from '../common/Message'

export default class MessageMaterial extends MessageBase {

  getStyles(){
    return styles;
  }

}

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: RkConfig.colors.white,
    alignSelf: 'flex-start',
    marginRight: 50,
    padding: 10,
    borderRadius: 1,
    marginVertical: 5
  },
  myMessageContainer: {
    backgroundColor: RkConfig.colors.cyan,
    alignSelf: 'flex-end',
    marginLeft: 50,
    marginRight: 0
  },
  messageText: {
    fontSize: 16,
    color: RkConfig.colors.cyan
  },
  myMessageText:{
    color: RkConfig.colors.white
  }
});