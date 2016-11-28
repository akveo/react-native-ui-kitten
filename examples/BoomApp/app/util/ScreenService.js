import React from 'react';

import ChatListScreenBase from '../screens/base/ChatListScreenBase';
import ChatScreenBase from '../screens/base/ChatScreenBase';

import AppWrapperClassic from '../components/classic/AppWrapper'
import AppWrapperBlur from '../components/blur/AppWrapper'
import PostClassic from '../components/classic/Post'
import ChatItemClassic from '../components/classic/ChatItem';
import ChatItemBlur from '../components/blur/ChatItem';
import ChatListHeaderClassic from '../components/classic/ChatListHeader';
import ChatListHeaderBlur from '../components/blur/ChatListHeader';
import ChatFooterClassic from '../components/classic/ChatFooter';
import ChatFooterBlur from '../components/blur/ChatFooter';
import MessageClassic from '../components/classic/Message';
import MessageBlur from '../components/blur/Message';
import MessageMaterial from '../components/material/Message';

import LoginScreenClassic from '../screens/classic/LoginScreen'
import MainScreenBase from '../screens/base/MainScreenBase'
import NewsScreenClassic from '../screens/classic/NewsScreen'
import ProfileScreenClassic from '../screens/classic/ProfileScreen'
import SettingsScreenClassic from '../screens/classic/SettingsScreen'

import LoginScreenMaterial from '../screens/material/LoginScreen'
import MainScreenMaterial from '../screens/material/MainScreen'
import ProfileScreenMaterial from '../screens/material/ProfileScreen'
import NewsScreenMaterial from '../screens/material/NewsScreen'

import MainScreenBlur from '../screens/blur/MainScreen'
import NewsScreenBlur from '../screens/blur/NewsScreen'
import ProfileScreenBlur from '../screens/blur/ProfileScreen'
import LoginScreenBlur from '../screens/blur/LoginScreen'

import {RkConfig} from 'react-native-ui-kit';

let classicTheme = {
  mainScreen: MainScreenBase,
  profileScreen: ProfileScreenClassic,
  chatListScreen: ChatListScreenBase,
  chatScreen: ChatScreenBase,
  loginScreen: LoginScreenClassic,
  newsScreen: NewsScreenClassic,
  settingsScreens: SettingsScreenClassic,
  appWrapperComponent: AppWrapperClassic,
  postComponent: PostClassic,
  chatItemComponent: ChatItemClassic,
  chatListHeaderComponent: ChatListHeaderClassic,
  messageComponent: MessageClassic,
  chatFooterComponent: ChatFooterClassic,
  setup: function () {
    RkConfig.theme = RkConfig.themes.classic;
  }
};

let materialTheme = {
  mainScreen: MainScreenMaterial,
  profileScreen: ProfileScreenMaterial,
  chatListScreen: ChatListScreenBase,
  chatScreen: ChatScreenBase,
  loginScreen: LoginScreenMaterial,
  newsScreen: NewsScreenMaterial,
  settingsScreens: SettingsScreenClassic,
  appWrapperComponent: AppWrapperClassic,
  postComponent: PostClassic,
  chatItemComponent: ChatItemClassic,
  chatListHeaderComponent: ChatListHeaderClassic,
  messageComponent: MessageMaterial,
  chatFooterComponent: ChatFooterClassic,
  setup: function () {
      RkConfig.theme = RkConfig.themes.material;
  }
};

let blurTheme = {
  mainScreen: MainScreenBase,
  profileScreen: ProfileScreenBlur,
  chatListScreen: ChatListScreenBase,
  chatScreen: ChatScreenBase,
  loginScreen: LoginScreenBlur,
  newsScreen: NewsScreenBlur,
  settingsScreens: SettingsScreenClassic,
  appWrapperComponent: AppWrapperBlur,
  postComponent: PostClassic,
  chatItemComponent: ChatItemBlur,
  chatListHeaderComponent: ChatListHeaderBlur,
  messageComponent: MessageBlur,
  chatFooterComponent: ChatFooterBlur,
  setup: function () {
    RkConfig.theme = RkConfig.themes.blur;
  }
};


let themes = [
  classicTheme,
  materialTheme,
  blurTheme
];

let currentThemeIndex = 2;
themes[currentThemeIndex].setup();

export default ScreenService = {

  getCurrentThemeIndex: () => currentThemeIndex,
  setCurrentThemeIndex: index => {
    currentThemeIndex = index;
    themes[currentThemeIndex].setup();
  },

  getMainScreen: () => themes[currentThemeIndex].mainScreen,
  getLoginScreen: () => themes[currentThemeIndex].loginScreen,
  getChatScreen: () => themes[currentThemeIndex].chatScreen,
  getChatListScreen: () => themes[currentThemeIndex].chatListScreen,
  getNewsScreen: () => themes[currentThemeIndex].newsScreen,
  getProfileScreen: () => themes[currentThemeIndex].profileScreen,
  getSettingsScreen: () => themes[currentThemeIndex].settingsScreens,

  getAppWrapperComponent: () => themes[currentThemeIndex].appWrapperComponent,
  getPostComponent: () => themes[currentThemeIndex].postComponent,
  getChatItemComponent: () => themes[currentThemeIndex].chatItemComponent,
  getChatListHeaderComponent: () => themes[currentThemeIndex].chatListHeaderComponent,
  getMessageComponent: () => themes[currentThemeIndex].messageComponent,
  getChatFooterComponent: () => themes[currentThemeIndex].chatFooterComponent
}