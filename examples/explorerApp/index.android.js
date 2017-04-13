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
import {bootstrap} from "./style/themeBootstrapper"

bootstrap();

const ExplorerApp = StackNavigator({
  Home: {screen: Screens.ComponentsScreen},
  Button: {screen: Screens.ButtonScreen},
  Choice: {screen: Screens.ChoiceScreen},
  Tab: {screen: Screens.TabScreen},
  Card: {screen: Screens.CardScreen},
  Avatar: {screen: Screens.AvatarScreen},
  Input: {screen: Screens.InputScreen},
  Image: {screen: Screens.ImageScreen},
  Settings: {screen: Screens.SettingsScreen},
  Test: {screen: Screens.TestScreen}
});

AppRegistry.registerComponent('ExplorerApp', () => ExplorerApp);