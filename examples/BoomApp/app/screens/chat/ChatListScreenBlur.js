import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';

import {RkConfig, RkStyle, RkButton} from 'react-native-ui-kit';
import Icon from 'react-native-vector-icons/Ionicons';

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
        <View style={this._styles.header}>
            <RkButton type='clear postControl' innerStyle={this.props.iconStyle}>
              <Icon name={'ios-person-add-outline'} style={{fontSize: 28}}/>
            </RkButton>
            <Text style={this._styles.headerText}>
              CHATS
            </Text>
            <RkButton type='clear postControl' innerStyle={this.props.iconStyle}>
              <Icon name={'ios-mail'} style={{fontSize: 28}}/>
            </RkButton>
        </View>
        {super._renderChatList()}
      </View>
    );
  }

  _renderSeparator() {

  }
}

let styles = {
  header: {
    marginTop: 0,
    paddingHorizontal: 10,
    paddingTop: 25,
    paddingBottom: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: RkConfig.colors.blurExtraDark,
    borderBottomWidth: 1,
    borderBottomColor: RkConfig.colors.blurDark,
  },
  headerText: {
    color: RkConfig.colors.blurTextStrong,
    backgroundColor: 'transparent',
  },
  list: {
    backgroundColor: 'transparent'
  },
  itemWrap:{
    padding: 5,
    paddingLeft: 0,
    backgroundColor: RkConfig.colors.blurBg,
    borderBottomWidth: 0.5,
    borderBottomColor: RkConfig.colors.blurBgStrong
  },
  itemContainer: {
    padding: 0,
    borderLeftWidth: 5,
    borderLeftColor: RkConfig.colors.blurBgStrong,
  },
  avatar: {
    width: 76,
    height: 76,
    opacity: 0.8,
    borderRadius: 3
  },
  textContainer: {
  },
  titleContainer: {
    justifyContent: 'center',
    marginLeft: 0,
    paddingLeft: 10,
  },
  title: {
    color: RkConfig.colors.blurTextStrong,
    backgroundColor: 'transparent'
  },
  subTitle: {
    color: RkConfig.colors.blurText,
    backgroundColor: 'transparent',
    fontSize: 14,
    marginTop: 10
  },
};
