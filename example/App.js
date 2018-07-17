import React from 'react';
import {
  StatusBar,
  View,
  Platform,
} from 'react-native';
import {
  AppLoading,
  Font,
} from 'expo';
import { StackNavigator } from 'react-navigation';
import * as Screens from './screens';
import { bootstrap } from './style/themeBootstrapper';

bootstrap();

const ExplorerApp = StackNavigator({
  Home: { screen: Screens.ComponentsScreen },
  Picker: { screen: Screens.PickerScreen },
  Button: { screen: Screens.ButtonScreen },
  Switch: { screen: Screens.SwitchScreen },
  Choice: { screen: Screens.ChoiceScreen },
  Tab: { screen: Screens.TabScreen },
  Card: { screen: Screens.CardScreen },
  Avatar: { screen: Screens.AvatarScreen },
  Input: { screen: Screens.InputScreen },
  Image: { screen: Screens.ImageScreen },
  Gallery: { screen: Screens.GalleryScreen },
  Settings: { screen: Screens.SettingsScreen },
  ChoiceCustomization: { screen: Screens.ChoiceCustomizationScreen },
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'white',
      marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight,
    },
  },
});

export default class App extends React.Component {
  state = {
    loaded: false,
  };

  componentWillMount() {
    this.loadAssets().then(this.onAssetsLoaded);
  }

  loadAssets = async () => {
    await Font.loadAsync({
      'Roboto-Light': require('./fonts/Roboto-Light.ttf'),
      'Roboto-Medium': require('./fonts/Roboto-Medium.ttf'),
      Borg: require('./fonts/Borg.ttf'),
      Curely: require('./fonts/Curely.ttf'),
      FontAwesome: require('./fonts/FontAwesome.ttf'),
    });
  };

  onAssetsLoaded = () => {
    this.setState({ loaded: true });
  };

  renderLoading = () => (<AppLoading />);

  renderApp = () => (
    <View style={{ flex: 1 }}>
      <ExplorerApp />
      <StatusBar barStyle="default" />
    </View>
  );

  render() {
    return !this.state.loaded ? this.renderLoading() : this.renderApp();
  }
}
