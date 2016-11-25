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
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreenBase from "../base/ProfileScreenBase";

export default class ProfileScreen extends ProfileScreenBase {

  constructor(props) {
    super(props);
    this._friends = api.getUserFriends(api.userId).concat(api.getUserFriends(api.userId));
  }


  render() {
    return (
      <ScrollView
        style={{backgroundColor: RkConfig.colors.materialGray}}
        automaticallyAdjustContentInsets={true}>
        <Image source={api.getUserInfo(api.userId).avatar}
               style={styles.avatar}/>
        <View style={styles.buttonWrap}>
          <RkButton style={styles.button} innerStyle={styles.buttonIconInner}><Icon name='ios-person'/></RkButton>
        </View>
        <RkText style={styles.nameText}>
          {api.getUserInfo(api.userId).name.first} {api.getUserInfo(api.userId).name.last}
        </RkText>
        {this._renderTabs(styles)}
      </ScrollView>
    );
  }

}

let styles = StyleSheet.create({
  tabView: {
    backgroundColor: RkConfig.colors.white,
  },
  tabContent: {
    paddingVertical: 15,
    backgroundColor: RkConfig.colors.lightGray
  },
  imageTab: {
    backgroundColor: RkConfig.colors.white,
    marginTop: 15,
    paddingVertical: 0,
  },
  statContainer: {
    alignItems: 'center',
    backgroundColor: RkConfig.colors.cyan,
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: RkConfig.colors.cyan
  },
  statContainerSelected: {
    borderBottomColor: RkConfig.colors.warning
  },
  buttonWrap:{
    backgroundColor: RkConfig.colors.cyan,
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  button: {
    marginTop: -24.5,
    marginRight: 30,
    borderRadius: 30,
    backgroundColor: RkConfig.colors.warning
  },
  buttonIconInner: {
    fontSize: 30,
    color: RkConfig.colors.white
  },
  avatar: {
    width: null,
    height: 200,
  },
  nameText: {
    backgroundColor: RkConfig.colors.cyan,
    paddingLeft: 20,
    paddingVertical: 5,
    fontSize: 28,
    color: 'white'
  },
  statusText: {
    paddingVertical: 0,
    fontSize: 16,
  },
  titleStatText: {
    fontSize: 20
  },
  statText: {
    textAlign: 'center',
    fontSize: 16,
    color: RkConfig.colors.warning
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
  }
});
