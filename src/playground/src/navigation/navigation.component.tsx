import React from 'react';
import { Platform } from 'react-native';
import {
  createAppContainer,
  NavigationRouteConfigMap,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import { createBrowserApp } from '@react-navigation/web';
import {
  AvatarContainer,
  BottomNavigationContainer,
  ButtonContainer,
  ButtonGroupContainer,
  CheckBoxContainer,
  DrawerContainer,
  Home,
  InputContainer,
  LayoutContainer,
  ListContainer,
  ModalContainer,
  OverflowMenuContainer,
  PopoverContainer,
  RadioContainer,
  RadioGroupContainer,
  SampleContainer,
  TabViewContainer,
  TextContainer,
  ToggleContainer,
  TooltipContainer,
  TopNavigationContainer,
  SelectContainer,
  SpinnerContainer,
  IconContainer,
  MenuContainer,
  CalendarContainer,
  DatepickerContainer,
  RangeCalendarContainer,
} from '../ui/screen';
import { DrawerNavigation } from './drawerNavigation.component';
import { sharingHeightContainer } from './sharingHeight.container';

export interface RouteType {
  name: string;
}

const routes: NavigationRouteConfigMap = {
  ['Home']: Home,
  ['Avatar']: AvatarContainer,
  ['Bottom Navigation']: BottomNavigationContainer,
  ['Button']: ButtonContainer,
  ['Button Group']: ButtonGroupContainer,
  ['Calendar']: CalendarContainer,
  ['Range Calendar']: RangeCalendarContainer,
  ['Checkbox']: CheckBoxContainer,
  ['Drawer']: DrawerContainer,
  ['Datepicker']: DatepickerContainer,
  ['Icon']: IconContainer,
  ['Input']: InputContainer,
  ['Layout']: LayoutContainer,
  ['List']: ListContainer,
  ['Menu']: MenuContainer,
  ['Modal']: ModalContainer,
  ['Popover']: PopoverContainer,
  ['Radio']: RadioContainer,
  ['Radio Group']: RadioGroupContainer,
  ['Spinner']: SpinnerContainer,
  ['Tab View']: TabViewContainer,
  ['Tooltip']: TooltipContainer,
  ['Text']: TextContainer,
  ['Toggle']: ToggleContainer,
  ['Top Navigation']: TopNavigationContainer,
  ['Overflow Menu']: OverflowMenuContainer,
  ['Sample']: SampleContainer,
  ['Select']: SelectContainer,
};

const MenuNavigator = createStackNavigator(routes, {
  initialRouteName: 'Home',
  headerMode: Platform.select({
    ios: 'screen',
    android: 'screen',
    default: 'none',
  }),
});

const DrawerNavigator = createDrawerNavigator({
  ...routes,
  ['Home']: MenuNavigator,
}, {
  contentComponent: DrawerNavigation,
  initialRouteName: 'Home',
});

export let Router: any;

switch (Platform.OS) {
  case 'web':
    Router = createBrowserApp(MenuNavigator, { history: 'hash' });
    break;
  default:
    Router = createAppContainer(DrawerNavigator);
}
