import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import ChatListScreenBase from "../base/ChatListScreenBase";
import {RkText, RkStyle, RkConfig, RkButton, RkCard} from 'react-native-ui-kit';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ChatListScreen extends ChatListScreenBase {

}


const styles = StyleSheet.create({
  titleContainer: {
    marginHorizontal: 0,
    margin: 0,
    marginBottom: 0,
    paddingVertical: 3,
    paddingHorizontal: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: RkConfig.colors.lightGray
  },
  chatLabel: {
    fontSize: 18
  }
});