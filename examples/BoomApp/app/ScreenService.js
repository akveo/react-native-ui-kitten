import React from 'react';


import LoginScreenClassic from './screens/auth/LoginScreenClassic'
import ChatListScreenClassic from './screens/chat/ChatListScreenClassic'
import ChatScreenClassic from './screens/chat/ChatScreenClassic'
import MainScreenClassic from './screens/main/MainScreenClassic'
import NewsScreenClassic from './screens/news/NewsScreenClassic'
import ProfileScreenClassic from './screens/profile/ProfileScreenClassic.js'
import SettingsScreenClassic from './screens/settings/SettingsScreenClassic.js'

import LoginScreenMaterial from './screens/auth/LoginScreenMaterial'

import LoginScreenBlur from './screens/auth/LoginScreenBlur'

let loginScreens = [
  (notRendered, props) => (notRendered ? LoginScreenClassic : <LoginScreenClassic {...props} />),
  (notRendered, props) => (notRendered ? LoginScreenMaterial : <LoginScreenMaterial {...props} />),
  (notRendered, props) => (notRendered ? LoginScreenBlur : <LoginScreenBlur {...props} />)
];

let chatListScreens = [
  (notRendered, props) => (notRendered ? ChatListScreenClassic : <ChatListScreenClassic {...props} />)
];

let chatScreens = [
  (notRendered, props) => (notRendered ? ChatScreenClassic : <ChatScreenClassic {...props} />)
];

let mainScreens = [
  (notRendered, props) => (notRendered ? MainScreenClassic : <MainScreenClassic {...props} />)
];

let newsScreens = [
  (notRendered, props) => (notRendered ? NewsScreenClassic : <NewsScreenClassic {...props} />)
];

let profileScreens = [
  (notRendered, props) => (notRendered ? ProfileScreenClassic : <ProfileScreenClassic {...props} />)
];

let settingsScreens = [
  (notRendered, props) => (notRendered ? SettingsScreenClassic : <SettingsScreenClassic {...props} />)
];

let currentMainScreenIndex = 0;
let currentLoginScreenIndex = 0;
let currentChatScreenIndex = 0;
let currentChatListScreenIndex = 0;
let currentNewsScreenIndex = 0;
let currentProfileScreenIndex = 0;
let currentSettingsScreenIndex = 0;

export default ScreenService = {

  getMainScreens: () => mainScreens,
  getLoginScreens: () => loginScreens,
  getChatScreens: () => chatScreens,
  getChatListScreens: () => chatListScreens,
  getNewsScreens: () => newsScreens,
  getProfileScreens: () => profileScreens,
  getSettingsScreens: () => settingsScreens,

  setMainScreen: (i) => currentMainScreenIndex = i,
  setLoginScreen: (i) => currentLoginScreenIndex = i,
  setChatScreen: (i) => currentChatScreenIndex = i,
  setChatListScreen: (i) => currentChatListScreenIndex = i,
  setNewsScreen: (i) => currentNewsScreenIndex = i,
  setProfileScreen: (i) => currentProfileScreenIndex = i,
  setSettingsScreen: (i) => currentSettingsScreenIndex = i,

  getMainScreen: (notRendered, props) => mainScreens[currentMainScreenIndex](notRendered, props),
  getLoginScreen: (notRendered, props) => loginScreens[currentLoginScreenIndex](notRendered, props),
  getChatScreen: (notRendered, props) => chatScreens[currentChatScreenIndex](notRendered, props),
  getChatListScreen: (notRendered, props) => chatListScreens[currentChatListScreenIndex](notRendered, props),
  getNewsScreen: (notRendered, props) => newsScreens[currentNewsScreenIndex](notRendered, props),
  getProfileScreen: (notRendered, props) => profileScreens[currentProfileScreenIndex](notRendered, props),
  getSettingsScreen: (notRendered, props) => settingsScreens[currentSettingsScreenIndex](notRendered, props),

  getCurrentMainScreenIndex: ()=>currentMainScreenIndex,
  getCurrentLoginScreenIndex: ()=>currentLoginScreenIndex,
  getCurrentChatScreenIndex: ()=>currentChatScreenIndex,
  getCurrentChatListScreenIndex: ()=>currentChatListScreenIndex,
  getCurrentNewsScreenIndex: ()=>currentNewsScreenIndex,
  getCurrentProfileScreenIndex: ()=>currentProfileScreenIndex,
  getCurrentSettingsScreenIndex: ()=>currentSettingsScreenIndex,

}