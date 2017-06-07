import React from 'react';
import * as Screens from './screens';
import {StackNavigator} from 'react-navigation';
import {bootstrap} from './style/themeBootstrapper'

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
  Settings: {screen: Screens.SettingsScreen}
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'white'
    }
  }
});

export default () => <ExplorerApp />;