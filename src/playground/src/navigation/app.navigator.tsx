import { Platform } from 'react-native';
import {
  createAppContainer,
  NavigationContainer,
} from 'react-navigation';
import { createBrowserApp } from '@react-navigation/web';
import { HomeNavigator } from './home.navigator';

const createAppNavigator = (): NavigationContainer => {
  if (Platform.OS === 'web') {
    return createBrowserApp(HomeNavigator, { history: 'hash' });
  }

  return createAppContainer(HomeNavigator);
};

export const AppNavigator = createAppNavigator();
