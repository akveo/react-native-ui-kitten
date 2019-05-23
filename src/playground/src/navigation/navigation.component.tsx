import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import {
  Home,
  Avatar,
  Button,
  BottomNavigation,
  ButtonGroup,
  Checkbox,
  Dialog,
  Input,
  Layout,
  List,
  Popover,
  Radio,
  RadioGroup,
  TabBar,
  TabView,
  Tooltip,
  Text,
  Toggle,
  ViewPager,
  TopNavigation,
  Modal,
  OverflowMenu,
} from '../ui/screen';

export interface RouteType {
  name: string;
}

export const routes: RouteType[] = [
  { name: 'Avatar' },
  { name: 'Bottom Navigation' },
  { name: 'Button' },
  { name: 'Button Group' },
  { name: 'Checkbox' },
  { name: 'Dialog' },
  { name: 'Input' },
  { name: 'Layout' },
  { name: 'List' },
  { name: 'Popover' },
  { name: 'Radio' },
  { name: 'Radio Group' },
  { name: 'Tab Bar' },
  { name: 'Tab View' },
  { name: 'Tooltip' },
  { name: 'Text' },
  { name: 'Toggle' },
  { name: 'View Pager' },
  { name: 'Top Navigation' },
  { name: 'Modal' },
  { name: 'Overflow Menu' },
];

const AppNavigator = createStackNavigator({
  ['Home']: Home,
  ['Avatar']: Avatar,
  ['Bottom Navigation']: BottomNavigation,
  ['Button']: Button,
  ['Button Group']: ButtonGroup,
  ['Checkbox']: Checkbox,
  ['Dialog']: Dialog,
  ['Input']: Input,
  ['Layout']: Layout,
  ['List']: List,
  ['Popover']: Popover,
  ['Radio']: Radio,
  ['Radio Group']: RadioGroup,
  ['Tab Bar']: TabBar,
  ['Tab View']: TabView,
  ['Tooltip']: Tooltip,
  ['Text']: Text,
  ['Toggle']: Toggle,
  ['View Pager']: ViewPager,
  ['Top Navigation']: TopNavigation,
  ['Modal']: Modal,
  ['Overflow Menu']: OverflowMenu,
}, {
  initialRouteName: 'Home',
});

export const Router: any = createAppContainer(AppNavigator);
