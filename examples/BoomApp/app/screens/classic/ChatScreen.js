import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import {RkConfig} from 'react-native-ui-kit';
import ChatScreenBase from "../base/ChatScreenBase";

export default class ChatScreenClassic extends ChatScreenBase {



  getStyle(){
    return styles;
  }

}

const styles = StyleSheet.create({
  toolbar: {
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0
  },
  boardUp: {
    backgroundColor: RkConfig.colors.lightGray
  },
  footer: {
    height: this._inputFooterHeight,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  messageContainer: {
    backgroundColor: RkConfig.colors.white,
    alignSelf: 'flex-start',
    marginRight: 50,
    padding: 10,
    borderRadius: 20,
    marginVertical: 5
  },
  myMessageContainer: {
    backgroundColor: RkConfig.colors.primary,
    alignSelf: 'flex-end',
    marginLeft: 50,
    marginRight: 0
  },
  messageText: {
    fontSize: 16,
    color: 'black'
  }
});
