import React from 'react';

import ChatListScreenBase from '../screens/base/ChatListScreenBase';
import ChatScreenBase from '../screens/base/ChatScreenBase';
import ProfileScreenBase from '../screens/base/ProfileScreenBase';
import MainScreenBase from '../screens/base/MainScreenBase';
import NewsScreenBase from '../screens/base/NewsScreenBase';

import AppWrapperClassic from '../components/classic/AppWrapper';
import AppWrapperBlur from '../components/blur/AppWrapper';
import PostClassic from '../components/classic/Post';
import ChatItemClassic from '../components/classic/ChatItem';
import ChatItemBlur from '../components/blur/ChatItem';
import ChatItemMaterial from '../components/material/ChatItem';
import ChatListHeaderClassic from '../components/classic/ChatListHeader';
import ChatListHeaderBlur from '../components/blur/ChatListHeader';
import ChatListHeaderMaterial from '../components/material/ChatListHeader';
import ChatFooterClassic from '../components/classic/ChatFooter';
import ChatFooterBlur from '../components/blur/ChatFooter';
import ChatFooterMaterial from '../components/material/ChatFooter';
import MessageClassic from '../components/classic/Message';
import MessageBlur from '../components/blur/Message';
import MessageMaterial from '../components/material/Message';
import Toolbar from '../components/common/Toolbar';
import ToolbarBlur from '../components/blur/Toolbar';
import ToolbarMaterial from '../components/material/Toolbar';
import ProfileTabClassic from '../components/classic/ProfileTab';
import ProfileTabBlur from '../components/blur/ProfileTab';
import ProfileTabMaterial from '../components/material/ProfileTab';
import ProfileClassic from '../components/classic/Profile';
import ProfileBlur from '../components/blur/Profile';
import NewsHeadClassic from '../components/classic/NewsHead';
import NewsHeadBlur from '../components/blur/NewsHead';

import LoginScreenClassic from '../screens/classic/LoginScreen';
import SettingsScreenClassic from '../screens/classic/SettingsScreen';

import LoginScreenMaterial from '../screens/material/LoginScreen';
import MainScreenMaterial from '../screens/material/MainScreen';

import LoginScreenBlur from '../screens/blur/LoginScreen';

import {RkConfig} from 'react-native-ui-kit';

let classicTheme = {
  mainScreen: MainScreenBase,
  profileScreen: ProfileScreenBase,
  chatListScreen: ChatListScreenBase,
  chatScreen: ChatScreenBase,
  loginScreen: LoginScreenClassic,
  newsScreen: NewsScreenBase,
  settingsScreens: SettingsScreenClassic,
  appWrapperComponent: AppWrapperClassic,
  postComponent: PostClassic,
  chatItemComponent: ChatItemClassic,
  chatListHeaderComponent: ChatListHeaderClassic,
  messageComponent: MessageClassic,
  chatFooterComponent: ChatFooterClassic,
  toolbarComponent: Toolbar,
  profileTabComponent: ProfileTabClassic,
  profileComponent: ProfileClassic,
  newsHeadComponent: NewsHeadClassic,
  setup: function () {
    RkConfig.theme = RkConfig.themes.classic;
  }
};

let materialTheme = {
  mainScreen: MainScreenMaterial,
  profileScreen: ProfileScreenBase,
  chatListScreen: ChatListScreenBase,
  chatScreen: ChatScreenBase,
  loginScreen: LoginScreenMaterial,
  newsScreen: NewsScreenBase,
  settingsScreens: SettingsScreenClassic,
  appWrapperComponent: AppWrapperClassic,
  postComponent: PostClassic,
  chatItemComponent: ChatItemMaterial,
  chatListHeaderComponent: ChatListHeaderMaterial,
  messageComponent: MessageMaterial,
  chatFooterComponent: ChatFooterMaterial,
  toolbarComponent: ToolbarMaterial,
  profileTabComponent: ProfileTabMaterial,
  profileComponent: ProfileClassic,
  newsHeadComponent: NewsHeadClassic,
  setup: function () {
      RkConfig.theme = RkConfig.themes.material;
  }
};

let blurTheme = {
  mainScreen: MainScreenBase,
  profileScreen: ProfileScreenBase,
  chatListScreen: ChatListScreenBase,
  chatScreen: ChatScreenBase,
  loginScreen: LoginScreenBlur,
  newsScreen: NewsScreenBase,
  settingsScreens: SettingsScreenClassic,
  appWrapperComponent: AppWrapperBlur,
  postComponent: PostClassic,
  chatItemComponent: ChatItemBlur,
  chatListHeaderComponent: ChatListHeaderBlur,
  messageComponent: MessageBlur,
  chatFooterComponent: ChatFooterBlur,
  toolbarComponent: ToolbarBlur,
  profileTabComponent: ProfileTabBlur,
  profileComponent: ProfileBlur,
  newsHeadComponent: NewsHeadBlur,
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

  getAppWrapperComponent: () => themes[currentThemeIndex].appWrapperComponent,
  getPostComponent: () => themes[currentThemeIndex].postComponent,
  getChatItemComponent: () => themes[currentThemeIndex].chatItemComponent,
  getChatListHeaderComponent: () => themes[currentThemeIndex].chatListHeaderComponent,
  getMessageComponent: () => themes[currentThemeIndex].messageComponent,
  getChatFooterComponent: () => themes[currentThemeIndex].chatFooterComponent,
  getToolbarComponent: () => themes[currentThemeIndex].toolbarComponent,
  getProfileTabComponent: () => themes[currentThemeIndex].profileTabComponent,
  getProfileComponent: () => themes[currentThemeIndex].profileComponent,
  getNewsHeadComponent: () => themes[currentThemeIndex].newsHeadComponent
}