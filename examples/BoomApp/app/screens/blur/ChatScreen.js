import React, { Component } from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';

import {RkConfig, RkTextInput, RkButton, RkText} from 'react-native-ui-kit';
import ChatScreenBase from "../base/ChatScreenBase";
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';

export default class ChatScreenBlur extends ChatScreenBase {


  render() {
    return (
      <Image
        source={require('../../../img/bg/blurBg.png')}
        style={RkConfig.styles.backgroundImage}>
        {super.render()}
      </Image>
    );
  }

  _renderMsgInput() {
    return (
      <RkTextInput
        placeholder='Message...'
        placeholderColor={'white'}
        style={{color: 'white'}}
        rkType='underline'
        onChangeText={message => this.setState({message})}
        value={this.state.message}
        clearButtonMode='while-editing'
        containerStyle={{marginHorizontal: 20, paddingVertical: 1, borderBottomColor: RkConfig.colors.blurText}}/>
    )
  }

  _renderMsgSubmit() {
    return (
      <RkButton rkType='iconButton' innerStyle={{color: 'white'}}
                onPress={()=>this._sendMessage()}>
        <Icon name='md-send'/>
      </RkButton>
    );
  }


  getStyle(){
    return styles;
  }

}

let styles = {
  toolbar: {
    backgroundColor: RkConfig.colors.blurBgStrong,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0
  },
  boardUp: {
    backgroundColor: RkConfig.colors.transparent
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: RkConfig.colors.blurBgStrong,
    padding: 5,
  },
  messageContainer: {
    backgroundColor: RkConfig.colors.blurBgStrong,
    alignSelf: 'flex-start',
    marginRight: 50,
    padding: 10,
    borderRadius: 20,
    marginVertical: 5
  },
  myMessageContainer: {
    backgroundColor: RkConfig.colors.blurBgStrong,
    alignSelf: 'flex-end',
    marginLeft: 50,
    marginRight: 0
  },
  messageText: {
    fontSize: 14,
    color: RkConfig.colors.blurTextStrong
  }
};
