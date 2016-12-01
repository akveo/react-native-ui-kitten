import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import Icon from '../../node_modules/react-native-vector-icons/Ionicons'; //TODO normal import string?
import {RkConfig, RkText, RkSeparator} from 'react-native-ui-kit';

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
          <Image source={require('../../img/materialBg.jpg')} style={styles.profileBg}>
            <View style={styles.profileContent}>
              <Image source={user.avatar} style={styles.userPhoto}/>
              <RkText style={styles.profileTitle}>
                {user.name.first} {user.name.last}
              </RkText>
              <RkText style={[styles.profileTitle, styles.profileEmail]}>
                {user.email}
              </RkText>
            </View>
          </Image>
        </TouchableOpacity>
        <RkSeparator/>
        <View style={{height: 8}}/>
        <TouchableOpacity onPress={() => this.props.changeScreen('News')}>
          <View style={styles.menuItem}>
            <Icon style={styles.menuItemIcon} name="md-paper"/>
            <RkText style={styles.menuItemText}>News</RkText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.changeScreen('Chats')}>
          <View style={styles.menuItem}>
            <Icon style={styles.menuItemIcon} name="md-chatboxes"/>
            <RkText style={styles.menuItemText}>Chats</RkText>
          </View>
          <View style={styles.subMenu}>
            {
              chatUsers.map(chatUser => {
                return (
                  <TouchableOpacity key={chatUser.id} onPress={() => this.props.openChat(chatUser)}>
                    <View style={styles.menuItem}>
                      <Image source={chatUser.avatar} style={styles.userPhotoSmall}/>
                      <RkText style={styles.menuItemText}>{chatUser.name.first} {chatUser.name.last}</RkText>
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
            <RkText style={styles.menuItemText}>Settings</RkText>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

}

var styles = StyleSheet.create({
  profileContent: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    paddingLeft: 16
  },
  profileBg: {
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