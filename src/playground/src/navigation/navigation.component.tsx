import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import {
  Home,
  ButtonContainer,
  ButtonGroupContainer,
  AvatarContainer,
  InputContainer,
  CheckBoxContainer,
  ToggleContainer,
  RadioContainer,
  TextContainer,
  ListContainer,
  PopoverContainer,
  TooltipContainer,
  OverflowMenuContainer,
  BottomNavigationContainer,
  TabViewContainer,
  TopNavigationContainer,
  RadioGroupContainer,
  LayoutContainer,
  ModalContainer,
} from '../ui/screen';

export interface RouteType {
  name: string;
}

const AppNavigator = createStackNavigator({
  ['Home']: Home,
  ['Avatar']: AvatarContainer,
  ['Bottom Navigation']: BottomNavigationContainer,
  ['Button']: ButtonContainer,
  ['Button Group']: ButtonGroupContainer,
  ['Checkbox']: CheckBoxContainer,
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
  ['Modal']: ModalContainer,
  ['Overflow Menu']: OverflowMenuContainer,
}, {
  initialRouteName: 'Home',
});

export const Router: any = createAppContainer(AppNavigator);
