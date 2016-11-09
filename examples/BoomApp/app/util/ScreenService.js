import React from 'react';

import LoginScreenClassic from '../screens/auth/LoginScreenBase'
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
import LoginScreenBlur from './../screens/auth/LoginScreenBlur'
import ChatListScreenBlur from './../screens/chat/ChatListScreenBlur'
import ChatScreenBlur from './../screens/chat/ChatScreenBlur'

let classicTheme = {
  mainScreen: MainScreenClassic,
  profileScreen: ProfileScreenClassic,
  chatListScreen: ChatListScreenClassic,
  chatScreen: ChatScreenClassic,
  loginScreen: LoginScreenClassic,
  newsScreen: NewsScreenClassic,
  settingsScreens: SettingsScreenClassic,
};

let materialTheme = {
  mainScreen: MainScreenMaterial,
  profileScreen: ProfileScreenClassic,
  chatListScreen: ChatListScreenMaterial,
  chatScreen: ChatScreenMaterial,
  loginScreen: LoginScreenMaterial,
  newsScreen: NewsScreenMaterial,
  settingsScreens: SettingsScreenClassic,
};

let blurTheme = {
  mainScreen: MainScreenBlur,
  profileScreen: ProfileScreenClassic,
  chatListScreen: ChatListScreenBlur,
  chatScreen: ChatScreenBlur,
  loginScreen: LoginScreenBlur,
  newsScreen: NewsScreenClassic,
  settingsScreens: SettingsScreenClassic,
};


let themes = [
  classicTheme,
  materialTheme,
  blurTheme
];

let currentThemeIndex = 2;


export default ScreenService = {

  currentThemeIndex,
  setCurrentThemeIndex: index => currentThemeIndex = index,

  getMainScreen: () => themes[currentThemeIndex].mainScreen,
  getLoginScreen: () => themes[currentThemeIndex].loginScreen,
  getChatScreen: () => themes[currentThemeIndex].chatScreen,
  getChatListScreen: () => themes[currentThemeIndex].chatListScreen,
  getNewsScreen: () => themes[currentThemeIndex].newsScreen,
  getProfileScreen: () => themes[currentThemeIndex].profileScreen,
  getSettingsScreen: () => themes[currentThemeIndex].settingsScreens,

}