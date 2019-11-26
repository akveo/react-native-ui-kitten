import {
  createBottomTabNavigator,
  createDrawerNavigator,
} from 'react-navigation';
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

export const HomeNavigator = createDrawerNavigator({
  ['Home']: HomeBottomNavigator,
}, {
  contentComponent: HomeDrawer,
  initialRouteName: 'Home',
});

