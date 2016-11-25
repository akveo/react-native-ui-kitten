import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import {RkConfig, RkButton,RkStyle, RkTextInput} from 'react-native-ui-kit';
import ChatScreenBase from "../base/ChatScreenBase";

export default class ChatScreenMaterial extends ChatScreenBase {

  getStyle(){
    return styles;
  }

  _renderMsgSubmit() {
    return (
      <RkButton style={{paddingVertical: 5}}
                onPress={()=>this._sendMessage()}>
        SEND
      </RkButton>
    );
  }

}

const styles = StyleSheet.create({
  toolbar: {
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: RkConfig.colors.cyan,
  },
  boardUp: {
    backgroundColor: RkConfig.colors.materialGray
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

