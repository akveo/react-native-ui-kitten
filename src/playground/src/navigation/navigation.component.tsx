import React from 'react';
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  NavigationRouteConfigMap,
} from 'react-navigation';
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
  IconContainer,
} from '../ui/screen';
import { DrawerNavigation } from './drawerNavigation.component';

export interface RouteType {
  name: string;
}

const routes: NavigationRouteConfigMap = {
  ['Home']: Home,
  ['Avatar']: AvatarContainer,
  ['Bottom Navigation']: BottomNavigationContainer,
  ['Button']: ButtonContainer,
  ['Button Group']: ButtonGroupContainer,
  ['Checkbox']: CheckBoxContainer,
  ['Drawer']: DrawerContainer,
  ['Icon']: IconContainer,
  ['Input']: InputContainer,
  ['Layout']: LayoutContainer,
  ['List']: ListContainer,
  ['Popover']: PopoverContainer,
  ['Radio']: RadioContainer,
  ['Radio Group']: RadioGroupContainer,
  ['Tab View']: TabViewContainer,
  ['Tooltip']: TooltipContainer,
  ['Text']: TextContainer,
  ['Toggle']: ToggleContainer,
  ['Top Navigation']: TopNavigationContainer,
  ['Overflow Menu']: OverflowMenuContainer,
  ['Sample']: SampleContainer,
  ['Modal']: ModalContainer,
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

export const Router: any = createAppContainer(DrawerNavigator);
