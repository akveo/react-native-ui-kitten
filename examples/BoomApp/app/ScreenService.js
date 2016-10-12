import React from 'react';


import LoginScreenClassic from './screens/auth/LoginScreenClassic'
import ChatListScreenClassic from './screens/chat/ChatListScreenClassic'
import ChatScreenClassic from './screens/chat/ChatScreenClassic'
import MainScreenClassic from './screens/main/MainScreenClassic'
import NewsScreenClassic from './screens/news/NewsScreenClassic'
import ProfileScreenClassic from './screens/profile/ProfileScreenClassic.js'
import SettingsScreenClassic from './screens/settings/SettingsScreenClassic.js'

import LoginScreenMaterial from './screens/auth/LoginScreenMaterial'
import MainScreenMaterial from './screens/main/MainScreenMaterial'
import ChatListScreenMaterial from './screens/chat/ChatListScreenMaterial'
import ChatScreenMaterial from './screens/chat/ChatScreenMaterial'

import LoginScreenBlur from './screens/auth/LoginScreenBlur'



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
  newsScreen: NewsScreenClassic,
  settingsScreens: SettingsScreenClassic,
};

let blurTheme = {
  mainScreen: MainScreenClassic,
  profileScreen: ProfileScreenClassic,
  chatListScreen: ChatListScreenClassic,
  chatScreen: ChatScreenClassic,
  loginScreen: LoginScreenBlur,
  newsScreen: NewsScreenClassic,
  settingsScreens: SettingsScreenClassic,
};

let initScreen = (Screen, notRendered, props) => {
  return notRendered ? Screen : <Screen {...props} />
};

let themes = [
  classicTheme,
  materialTheme,
  blurTheme
];

let currentThemeIndex = 0;


export default ScreenService = {

  currentThemeIndex,
  setCurrentThemeIndex: index => currentThemeIndex = index,

  getMainScreen: (notRendered, props) => initScreen(themes[currentThemeIndex].mainScreen, notRendered, props),
  getLoginScreen: (notRendered, props) => initScreen(themes[currentThemeIndex].loginScreen, notRendered, props),
  getChatScreen: (notRendered, props) => initScreen(themes[currentThemeIndex].chatScreen, notRendered, props),
  getChatListScreen: (notRendered, props) => initScreen(themes[currentThemeIndex].chatListScreen, notRendered, props),
  getNewsScreen: (notRendered, props) => initScreen(themes[currentThemeIndex].newsScreen, notRendered, props),
  getProfileScreen: (notRendered, props) => initScreen(themes[currentThemeIndex].profileScreen, notRendered, props),
  getSettingsScreen: (notRendered, props) => initScreen(themes[currentThemeIndex].settingsScreens, notRendered, props),

}