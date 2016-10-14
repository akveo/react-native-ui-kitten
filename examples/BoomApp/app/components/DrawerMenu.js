import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import Icon from '../../node_modules/react-native-vector-icons/Ionicons'; //TODO normal import string?
import {RkConfig, RkButton, RkSeparator} from 'react-native-ui-kit';

export default class DrawerMenu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let user = this.props.user;
    let chatUsers = this.props.recentChats;
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.changeScreen('Profile')}>
          <Image source={user.profileBg} style={styles.profileBg}>
            <View style={styles.profileContent}>
              <Image source={user.avatar} style={styles.userPhoto}/>
              <Text style={styles.profileTitle}>
                {user.name.first} {user.name.last}
              </Text>
              <Text style={[styles.profileTitle, styles.profileEmail]}>
                {user.email}
              </Text>
            </View>
          </Image>
        </TouchableOpacity>
        <RkSeparator/>
        <View style={{height: 8}}/>
        <TouchableOpacity onPress={() => this.props.changeScreen('News')}>
          <View style={styles.menuItem}>
            <Icon style={styles.menuItemIcon} name="md-paper"/>
            <Text style={styles.menuItemText}>News</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.changeScreen('Chats')}>
          <View style={styles.menuItem}>
            <Icon style={styles.menuItemIcon} name="md-chatboxes"/>
            <Text style={styles.menuItemText}>Chats</Text>
          </View>
          <View style={styles.subMenu}>
            {
              chatUsers.map(chatUser => {
                return (
                  <TouchableOpacity key={chatUser.id} onPress={() => this.props.openChat(chatUser)}>
                    <View style={styles.menuItem}>
                      <Image source={chatUser.avatar} style={styles.userPhotoSmall}/>
                      <Text style={styles.menuItemText}>{chatUser.name.first} {chatUser.name.last}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </TouchableOpacity>
        <View style={{height: 8}}/>
        <RkSeparator/>
        <View style={{height: 8}}/>
        <TouchableOpacity onPress={() => this.props.changeScreen('Settings')}>
          <View style={styles.menuItem}>
            <Icon style={styles.menuItemIcon} name="md-settings"/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

}

var styles = StyleSheet.create({
  profileContent:{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
    paddingLeft: 16
  },
  profileBg:{
    width: null,
    height: 200
  },
  menuItem: {
    paddingLeft: 15,
    paddingVertical: 10,
    flexDirection: 'row'
  },
  menuItemText: {
    fontSize: 18,
    color: RkConfig.colors.darkGray
  },
  menuItemIcon: {
    fontSize: 22,
    marginRight: 30,
    color: RkConfig.colors.darkGray
  },
  subMenu: {
    marginLeft: 15
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10
  },
  userPhotoSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 20,
  },
  profileTitle: {
    backgroundColor: 'transparent',
    fontSize: 18,
    color: RkConfig.colors.white,
    fontWeight: 'bold'
  },
  profileEmail: {
    marginTop: 5,
    marginBottom: 15,
    fontSize: 16,
  }
});