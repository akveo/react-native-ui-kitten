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

import {
  RkConfig,
  RkSeparator,
  RkButton,
  RkStyle,
  RkText
} from 'react-native-ui-kit';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import api from '../../util/ApiMock';
import FriendList from '../../components/FriendList';
import ContactList from '../../components/ContactList';
import ImageList from '../../components/ImageList';
import ProfileScreenClassic from './ProfileScreenClassic';

export default class ProfileScreenBlur extends ProfileScreenClassic {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          automaticallyAdjustContentInsets={true}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 20}}>
            <RkButton style={styles.button} innerStyle={styles.buttonIconInner}><Icon name='ios-person'/></RkButton>
            <Image source={api.getUserInfo(api.userId).avatar} style={styles.avatar}/>
            <RkButton style={styles.button} innerStyle={styles.buttonIconInner}><Icon name='ios-mail'/></RkButton>
          </View>
          <RkText style={[styles.text, styles.onlineText]}>Online</RkText>
          <RkText style={[styles.text, styles.nameText]}>{api.getUserInfo(api.userId).name.first} {api.getUserInfo(api.userId).name.last}</RkText>
          <RkText style={[styles.text, styles.statusText]}>Head cook and bottle-washer.</RkText>
          <RkButton style={[styles.button, styles.followButton]} innerStyle={styles.buttonInner}>Follow</RkButton>
          <View
            style={{flex: 1}}>
            {this._renderTabs()}
          </View>
        </ScrollView>
      </View>
    );
  }

  _getStyles() {
    return styles;
  }

}

let styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    shadowColor: RkConfig.colors.blurBgStrong,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  button:{
    borderWidth: 1,
    borderColor: RkConfig.colors.blurText,
    borderStyle: 'dotted',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: RkConfig.colors.blurBgStrong,
  },
  buttonInner:{
    color: 'white'
  },
  buttonIconInner:{
    color: 'white',
    fontSize: 32,
    width: 25,
    height: 35
  },
  text:{
    textAlign: 'center'
  },
  followButton:{
    alignSelf: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 50,
    marginTop: 15,
    marginBottom: 5,
  },
  onlineText:{
    marginTop: 3,
    marginBottom: 5,
    fontWeight: '100'
  },
  nameText:{
    marginBottom: 3,
    fontSize: 26,
    fontWeight: 'bold'
  },
  statusText:{
    fontSize: 14,
    fontWeight: '100'
  },
  tabView: {
    backgroundColor: RkConfig.colors.blurBgStrong,
    margin: 10,
    borderRadius: 35,
  },
  tabContent:{
    marginTop: 10,
    backgroundColor: RkConfig.colors.blurExtraDark
  },
  statContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 35,
    padding: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  statContainerSelected: {
    borderColor: RkConfig.colors.blurPrimary,
    backgroundColor: RkConfig.colors.blurBgStrong,
  },
  titleStatText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  statText: {
    textAlign: 'center',
    fontSize: 14,
    color: RkConfig.colors.white
  },
  postIconsStyle:{
    color: RkConfig.colors.blurTextStrong
  }
});
