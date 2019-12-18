import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { HomeDrawer } from '@pg/scenes/home/homeDrawer.component';
import { HomeTabBar } from '@pg/scenes/home/homeTabBar.component';
import { ComponentsNavigator } from './components.navigator';
import { SamplesNavigator } from './samples.navigator';

const HomeBottomNavigator = createBottomTabNavigator({
  ['Components']: ComponentsNavigator,
  ['Samples']: SamplesNavigator,
}, {
  tabBarComponent: HomeTabBar,
});

const HomeDrawerNavigator = createDrawerNavigator({
  ['Home']: HomeBottomNavigator,
}, {
  contentComponent: HomeDrawer,
  initialRouteName: 'Home',
});

const createHomeNavigator = () => {
  if (Platform.OS === 'web') {
    return HomeBottomNavigator;
  }

  return HomeDrawerNavigator;
};

export const HomeNavigator = createHomeNavigator();

