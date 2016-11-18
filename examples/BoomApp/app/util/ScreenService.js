import React from 'react';

import LoginScreenClassic from '../screens/auth/LoginScreenClassic'
import ChatListScreenClassic from './../screens/chat/ChatListScreenClassic'
import ChatScreenClassic from './../screens/chat/ChatScreenClassic'
import MainScreenClassic from './../screens/main/MainScreenClassic'
import NewsScreenClassic from './../screens/news/NewsScreenClassic'
import ProfileScreenClassic from './../screens/profile/ProfileScreenClassic.js'
import SettingsScreenClassic from './../screens/settings/SettingsScreenClassic.js'

import LoginScreenMaterial from './../screens/auth/LoginScreenMaterial'
import MainScreenMaterial from './../screens/main/MainScreenMaterial'
import ChatListScreenMaterial from './../screens/chat/ChatListScreenMaterial'
import ChatScreenMaterial from './../screens/chat/ChatScreenMaterial'
import NewsScreenMaterial from './../screens/news/NewsScreenMaterial'

import MainScreenBlur from './../screens/main/MainScreenBlur'
import NewsScreenBlur from './../screens/news/NewsScreenBlur'
import ProfileScreenBlur from './../screens/profile/ProfileScreenBlur'
import LoginScreenBlur from './../screens/auth/LoginScreenBlur'
import ChatListScreenBlur from './../screens/chat/ChatListScreenBlur'
import ChatScreenBlur from './../screens/chat/ChatScreenBlur'

import {RkConfig} from 'react-native-ui-kit';

let classicTheme = {
  mainScreen: MainScreenClassic,
  profileScreen: ProfileScreenClassic,
  chatListScreen: ChatListScreenClassic,
  chatScreen: ChatScreenClassic,
  loginScreen: LoginScreenClassic,
  newsScreen: NewsScreenClassic,
  settingsScreens: SettingsScreenClassic,
  setup: function () {
    RkConfig.theme = RkConfig.themes.classic;
  }
};

let materialTheme = {
  mainScreen: MainScreenMaterial,
  profileScreen: ProfileScreenClassic,
  chatListScreen: ChatListScreenMaterial,
  chatScreen: ChatScreenMaterial,
  loginScreen: LoginScreenMaterial,
  newsScreen: NewsScreenMaterial,
  settingsScreens: SettingsScreenClassic,
  setup: function () {
      RkConfig.theme = RkConfig.themes.material;
  }
};

let blurTheme = {
  mainScreen: MainScreenBlur,
  profileScreen: ProfileScreenBlur,
  chatListScreen: ChatListScreenBlur,
  chatScreen: ChatScreenBlur,
  loginScreen: LoginScreenBlur,
  newsScreen: NewsScreenBlur,
  settingsScreens: SettingsScreenClassic,
  setup: function () {
    RkConfig.theme = RkConfig.themes.blur;
  }
};


let themes = [
  classicTheme,
  materialTheme,
  blurTheme
];

let currentThemeIndex = 0;
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

}