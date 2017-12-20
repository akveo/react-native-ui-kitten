import React from 'react';
import * as Screens from './screens';
import {StackNavigator} from 'react-navigation';
import {bootstrap} from './style/themeBootstrapper'
import { StatusBar, View, Platform } from 'react-native';
import { AppLoading, Font } from 'expo';

bootstrap();

const ExplorerApp = StackNavigator({
  Home: {screen: Screens.ComponentsScreen},
  Picker: {screen: Screens.PickerScreen},
  Button: {screen: Screens.ButtonScreen},
  Choice: {screen: Screens.ChoiceScreen},
  Tab: {screen: Screens.TabScreen},
  Card: {screen: Screens.CardScreen},
  Avatar: {screen: Screens.AvatarScreen},
  Input: {screen: Screens.InputScreen},
  Image: {screen: Screens.ImageScreen},
  Settings: {screen: Screens.SettingsScreen},
  ChoiceCustomization: {screen: Screens.ChoiceCustomizationScreen}
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'white',
      marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight
    }
  }
});

export default class App extends React.Component {
  state  = {
    loaded: false,
  };

  componentWillMount() {
    this._loadAssetsAsync();
  }

  _loadAssetsAsync = async () => {
    await Font.loadAsync({
      'Roboto-Light': require('./fonts/Roboto-Light.ttf'),
      'Roboto-Medium': require('./fonts/Roboto-Medium.ttf'),
      Borg: require('./fonts/Borg.ttf'),
      Curely: require('./fonts/Curely.ttf'),
      'FontAwesome': require('./fonts/FontAwesome.ttf'),
    });

    this.setState({loaded: true});
  };

  render() {
    if (!this.state.loaded) {
      return <AppLoading />;
    }

    return (
      <View style={{flex: 1}}>
        <ExplorerApp />
        <StatusBar barStyle="default" />
      </View>
    );
  }

}
