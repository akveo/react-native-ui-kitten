import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import {RkConfig} from 'react-native-ui-kit';

import _ from "lodash";
import ChatListScreenBase from "../base/ChatListScreenBase";


export default class ChatListScreenMaterial extends ChatListScreenBase {


  render() {
    return (
      this._render({
        marginTop: 0
      })
    )
  }

  _renderHeader(){}

}
