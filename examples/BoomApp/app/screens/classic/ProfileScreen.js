import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {RkConfig, RkText, RkButton, RkStyle, RkTabView} from 'react-native-ui-kit';
import api from '../../util/ApiMock';
import ProfileScreenBase from "../base/ProfileScreenBase";

export default class ProfileScreen extends ProfileScreenBase {

  constructor(props) {
    super(props);
    this._friends = api.getUserFriends(api.userId).concat(api.getUserFriends(api.userId));
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={{backgroundColor: 'white'}}
          automaticallyAdjustContentInsets={true}>
          <Image source={api.getUserInfo(api.userId).profileBg}
                 style={{ width: null, height: 220, justifyContent: 'flex-end', alignItems: 'stretch', }}>
            <View/>
            <Image source={api.getUserInfo(api.userId).avatar}
                   style={[RkStyle.card.avatarBigImg, {alignSelf: 'center'}]}/>
            <RkText
              style={{backgroundColor: RkConfig.colors.blurBg, paddingLeft: 20, paddingVertical: 5, fontSize: 32, color: 'white'}}>
              {api.getUserInfo(api.userId).name.first} {api.getUserInfo(api.userId).name.last}
            </RkText>
          </Image>
          <View
            style={{flex: 1}}>
            {this._renderTabs(styles)}
          </View>
        </ScrollView>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  tabView:{
    backgroundColor: 'white',
  },
  tabContent:{
    paddingVertical: 15,
    backgroundColor: RkConfig.colors.lightGray
  },
  statContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: 'transparent'
  },
  statContainerSelected: {
    borderBottomColor: RkConfig.colors.primary
  },
  titleStatText: {
    fontSize: 16
  },
  statText: {
    textAlign: 'center',
    fontSize: 14,
    color: RkConfig.colors.primary
  },
  contactContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  contactIcon: {
    fontSize: 24,
    alignSelf: 'center',
    color: RkConfig.colors.primary,
  },
  postIconsStyle:{
    color: RkConfig.colors.primary
  },
  friendCard: {
    marginBottom: 0,
    marginHorizontal: 0,
    borderBottomColor: RkConfig.colors.lightGray,
    borderBottomWidth: 1
  },
  friendHeader:{
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  friendIcon:{
    fontSize: 28,
    color: RkConfig.colors.primary
  },
});
