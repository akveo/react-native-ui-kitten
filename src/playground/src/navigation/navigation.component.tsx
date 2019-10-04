import React from 'react';
import {
  createAppContainer,
  NavigationRouteConfigMap,
} from 'react-navigation';
import {
  createStackNavigator,
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
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
import { Platform } from 'react-native';

export interface RouteType {
  name: string;
}

const routes: NavigationRouteConfigMap<NavigationStackOptions, NavigationStackProp> = {
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
  headerMode: 'screen',
});

const DrawerNavigator = createDrawerNavigator({
  ...routes,
  ['Home']: MenuNavigator,
}, {
  contentComponent: DrawerNavigation,
  initialRouteName: 'Home',
});

export const Router: any = Platform.select({
  default: createAppContainer(DrawerNavigator),
  web: createAppContainer(MenuNavigator),
});
