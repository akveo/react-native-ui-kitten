import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';

import {RkConfig, RkButton,RkStyle, RkTextInput} from 'react-native-ui-kit';
import ChatScreenClassic from './ChatScreenClassic';
import _ from "lodash";


export default class ChatScreenBlur extends ChatScreenClassic {

  constructor(props) {
    super(props);
    this._styles = _.merge(this._styles, styles);
  }

  render() {
    return (
      <Image blurRadius={30} source={require('../../../img/bg/lamp.jpg')} style={RkConfig.styles.backgroundImage}>
        {this._render()}
      </Image>
    );
  }

  _renderMsgSubmit() {
    return (
      <RkButton type='clear' innerStyle={{color: RkConfig.colors.blurTextStrong}}
                style={{paddingVertical: 5}}
                onPress={()=>this._sendMessage()}>
        Send
      </RkButton>
    )
  }

  _renderMsgInput() {
    return (
      <RkTextInput
        placeholder='Message...'
        placeholderTextColor={RkConfig.colors.blurText}
        type='bordered'
        style={{color: RkConfig.colors.blurTextStrong}}
        onChangeText={message => this.setState({message})}
        value={this.state.message}
        clearButtonMode='while-editing'
        containerStyle={{marginHorizontal: 20, paddingVertical: 1}}/>
    )
  }

}

let styles = {
  boardUp: {
    backgroundColor: RkConfig.colors.transparent
  },
  footer: {
    backgroundColor: RkConfig.colors.blurBgStrong,
  },
  messageContainer: {
    backgroundColor: RkConfig.colors.blurBgStrong,
    borderRadius: 2,
  },
  myMessageContainer: {
    backgroundColor: RkConfig.colors.blurBgStrong,
  },
  messageText: {
    color: RkConfig.colors.blurTextStrong
  }
};
