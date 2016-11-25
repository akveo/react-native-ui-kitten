import React from 'react';

import LoginScreenClassic from '../screens/classic/LoginScreen'
import ChatListScreenClassic from '../screens/classic/ChatListScreen'
import ChatScreenClassic from '../screens/classic/ChatScreen'
import MainScreenClassic from '../screens/classic/MainScreen'
import NewsScreenClassic from '../screens/classic/NewsScreen'
import ProfileScreenClassic from '../screens/classic/ProfileScreen'
import SettingsScreenClassic from '../screens/classic/SettingsScreen'

import LoginScreenMaterial from '../screens/material/LoginScreen'
import MainScreenMaterial from '../screens/material/MainScreen'
import ProfileScreenMaterial from '../screens/material/ProfileScreen'
import ChatListScreenMaterial from '../screens/material/ChatListScreen'
import ChatScreenMaterial from '../screens/material/ChatScreen'
import NewsScreenMaterial from '../screens/material/NewsScreen'

import MainScreenBlur from '../screens/blur/MainScreen'
import NewsScreenBlur from '../screens/blur/NewsScreen'
import ProfileScreenBlur from '../screens/blur/ProfileScreen'
import LoginScreenBlur from '../screens/blur/LoginScreen'
import ChatListScreenBlur from '../screens/blur/ChatListScreen'
import ChatScreenBlur from '../screens/blur/ChatScreen'

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
  profileScreen: ProfileScreenMaterial,
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

let currentThemeIndex = 1;
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