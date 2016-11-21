import React, {Component} from 'react';
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
      <ScrollView
        style={RkStyle.whiteBg}
        automaticallyAdjustContentInsets={true}>
        <Image source={api.getUserInfo(api.userId).profileBg}
               style={styles.profileBackground}>
          <View/>
          <Image source={api.getUserInfo(api.userId).avatar}
                 style={styles.avatar}/>
          <RkText style={styles.nameText}>
            {api.getUserInfo(api.userId).name.first} {api.getUserInfo(api.userId).name.last}
          </RkText>
        </Image>
        <View style={RkStyle.flex1}>
          {this._renderTabs(styles)}
        </View>
      </ScrollView>
    );
  }

}

let styles = StyleSheet.create({
  tabView: {
    backgroundColor: 'white',
  },
  tabContent: {
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
  profileBackground:{
    width: null,
    height: 220,
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center'
  },
  nameText:{
    backgroundColor: RkConfig.colors.blurBg,
    paddingLeft: 20,
    paddingVertical: 5,
    fontSize: 32,
    color: 'white'
  },
  statContainerSelected: {
    borderBottomColor: RkConfig.colors.primary
  },
  titleStatText: {
    fontSize: 20
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
  postIconsStyle: {
    color: RkConfig.colors.primary
  },
  friendIcon: {
    fontSize: 28,
    color: RkConfig.colors.primary
  },
});
