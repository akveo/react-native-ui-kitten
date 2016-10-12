import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import Drawer from 'react-native-drawer'
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons'; //TODO normal import string?
import ScreenService from '../../ScreenService';
import {RkConfig, RkBarBg, RkTabView, RkButton, RkSeparator, RkStyle} from 'react-native-ui-kit';
import api from '../../api';
import MaterialToolBar from '../../components/MaterialToolbar';
import DrawerMenu from '../../components/DrawerMenu';

export default class MainScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'News'
    };
  }

  render() {
    const drawerStyles = {
      drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
      main: {paddingLeft: 3},
    };
    return (
      <Drawer
        ref="drawer"
        content={<DrawerMenu
          user={api.getUserInfo(api.userId)}
          recentChats={[api.getUserInfo('2'), api.getUserInfo('3'), api.getUserInfo('4')]}
          changeScreen={(name) => this._changeScreen(name)}
          openChat={(user) => this._openChat(user)}
        />}
        type="overlay"
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        panOpenMask={0.5}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
           mainOverlay: { opacity: 0.6*ratio, backgroundColor: 'black' }
        })}
      >
        <MaterialToolBar title={this.state.selectedTab} onMenuClick={()=>(this.refs.drawer.open())}/>
        {this._getCurrentScreen()}
      </Drawer>
    );
  }

  _changeScreen(screenName) {
    this.setState({
      selectedTab: screenName
    });
    this.refs.drawer.close();
  }

  _openChat(user) {
    this.refs.drawer.close();
    this.props.navigator.push({
      title: `${user.name.first} ${user.name.last}`,
      component: ScreenService.getChatScreen(true),
      barTintColor: RkConfig.colors.primary,
      titleTextColor: RkConfig.colors.white,
      navigationBarHidden: false,
      passProps: {
        userId: user.id
      }
    });
  }

  _getCurrentScreen() {
    if (this.state.selectedTab === 'Profile') {
      return ScreenService.getProfileScreen(false, {navigator: this.props.navigator})
    }
    if (this.state.selectedTab === 'News') {
      return ScreenService.getNewsScreen(false, {navigator: this.props.navigator})
    }
    if (this.state.selectedTab === 'Chats') {
      return ScreenService.getChatListScreen(false, {navigator: this.props.navigator})
    }
    if (this.state.selectedTab === 'Settings') {
      return ScreenService.getSettingsScreen(false, {navigator: this.props.navigator})
    }
  }

}
var styles = StyleSheet.create({});


