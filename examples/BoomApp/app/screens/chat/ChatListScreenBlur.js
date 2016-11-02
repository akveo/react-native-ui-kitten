import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';

import {RkConfig, RkStyle, RkButton} from 'react-native-ui-kit';

import ChatListScreenClassic from './ChatListScreenClassic';
import _ from "lodash";


export default class ChatListScreenBlur extends ChatListScreenClassic {

  constructor(props) {
    super(props);
    this._styles = _.merge(this._styles, styles);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Image blurRadius={30} source={require('../../../img/bg/lamp.jpg')} style={RkConfig.styles.backgroundImage}>
          <View style={this._styles.header}>
            <View>
              <Text style={this._styles.headerText}>
                Chats
              </Text>
            </View>
          </View>
          {super._renderChatList()}
        </Image>
      </View>
    );
  }

  _renderSeparator(){

  }
}

let styles = {
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: RkConfig.colors.blurBgWhite
  },
  headerText: {
    color: RkConfig.colors.blurTextStrong,
    backgroundColor: 'transparent',
  },
  list: {
    backgroundColor: 'transparent'
  },
  itemContainer: {
    backgroundColor: RkConfig.colors.blurBg,
    padding: 0
  },
  avatar: {
    width: 76,
    height: 76,
    opacity: 0.8,
    borderRadius: 0,
  },
  textContainer:{
    borderTopWidth: 1,
    borderTopColor: RkConfig.colors.blurBgWhite,
    borderLeftWidth: 15,
    borderLeftColor: RkConfig.colors.blurBgStrong
  },
  titleContainer: {
    marginLeft: 0,
    paddingLeft: 10,
  },
  title: {
    color: RkConfig.colors.blurTextStrong,
    backgroundColor: 'transparent'
  },
  subTitle: {
    color: RkConfig.colors.gray,
    backgroundColor: 'transparent',
    fontSize: 14
  },
};
