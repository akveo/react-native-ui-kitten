import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import {RkConfig} from 'react-native-ui-kit';

import ChatListScreenClassic from './ChatListScreenClassic';
import _ from "lodash";


export default class ChatListScreenMaterial extends ChatListScreenClassic {

  constructor(props) {
    super(props);
    this._styles = _.merge(this._styles, styles);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {super._renderChatList()}
      </View>
    );
  }
}

let styles = {
  itemContainer: {
    padding: 15
  },
  title: {
    color: RkConfig.colors.darkGray,
    fontWeight: 'bold'
  },
  chatSeparator: {
    marginLeft: 0,
  }
};
