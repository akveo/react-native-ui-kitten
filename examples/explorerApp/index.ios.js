import React, {Component} from 'react';
import {
  AppRegistry,
  StatusBar,
  View,
  Text,
  Title,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import * as Screens from "./screens";
import {StackNavigator} from 'react-navigation';
import {RkTheme} from 'react-native-ui-kitten'
import {bootstrap} from "./style/themeBootstrapper"

bootstrap();

const {header} =({state, setParams}) => ({
  style: {
    backgroundColor: 'white'
  }
});

const ExplorerApp = StackNavigator({
  Home: {screen: Screens.ComponentsScreen},
  Button: {screen: Screens.ButtonScreen},
  Choice: {screen: Screens.ChoiceScreen},
  Tab: {screen: Screens.TabScreen},
  Card: {screen: Screens.CardScreen},
  Avatar: {screen: Screens.AvatarScreen},
  Input: {screen: Screens.InputScreen},
  Image: {screen: Screens.ImageScreen},
  Settings: {screen: Screens.SettingsScreen}
});

AppRegistry.registerComponent('ExplorerApp', () => ExplorerApp);