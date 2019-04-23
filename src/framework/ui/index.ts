import { styled } from '@kitten/theme';
import {
  Avatar as AvatarComponent,
  Props as AvatarProps,
} from './avatar/avatar.component';
import {
  BottomNavigationTab as BottomNavigationTabComponent,
  Props as BottomNavigatorTabProps,
} from './bottomNavigation/bottomNavigationTab.component';
import {
  BottomNavigation as BottomNavigationComponent,
  Props as BottomTabNavigatorProps,
} from './bottomNavigation/bottomNavigation.component';
import {
  Button as ButtonComponent,
  Props as ButtonProps,
} from './button/button.component';
import {
  ButtonGroup as ButtonGroupComponent,
  Props as ButtonGroupProps,
} from './buttonGroup/buttonGroup.component';
import {
  CheckBox as CheckBoxComponent,
  Props as CheckBoxProps,
} from './checkbox/checkbox.component';
import {
  Input as InputComponent,
  Props as InputProps,
} from './input/input.component';
import {
  Layout as LayoutComponent,
  Props as LayoutProps,
} from './layout/layout.component';
import {
  List as ListComponent,
  Props as ListProps,
} from './list/list.component';
import {
  ListItem as ListItemComponent,
  Props as ListItemProps,
} from './list/listItem.component';
import {
  Modal,
  Props as ModalProps,
} from './modal/modal.component';
import {
  OverflowMenu as OverflowMenuComponent,
  Props as OverflowMenuProps,
} from './overflowMenu/overflowMenu.component';
import {
  OverflowMenuItem as OverflowMenuItemComponent,
  Props as OverflowMenuItemProps,
  OverflowMenuItemType,
} from './overflowMenu/overflowMenuItem.component';
import {
  Popover as PopoverComponent,
  Props as PopoverProps,
} from './popover/popover.component';
import {
  Radio as RadioComponent,
  Props as RadioProps,
} from './radio/radio.component';
import {
  RadioGroup as RadioGroupComponent,
  Props as RadioGroupProps,
} from './radioGroup/radioGroup.component';
import {
  Tab as TabComponent,
  Props as TabProps,
} from './tab/tab.component';
import {
  TabBar as TabBarComponent,
  Props as TabBarProps,
} from './tab/tabBar.component';
import {
  TabView,
  Props as TabViewProps,
} from './tab/tabView.component';
import {
  Text as TextComponent,
  Props as TextProps,
} from './text/text.component';
import {
  Toggle as ToggleComponent,
  Props as ToggleProps,
} from './toggle/toggle.component';
import {
  Tooltip as TooltipComponent,
  Props as TooltipProps,
} from './tooltip/tooltip.component';
import {
  TopNavigation as TopNavigationComponent,
  Props as TopNavigationBarProps,
} from './topNavigation/topNavigation.component';
import {
  TopNavigationAction as TopNavigationActionComponent,
  Props as TopNavigationBarActionProps,
} from './topNavigation/topNavigationAction.component';
import {
  ViewPager,
  Props as ViewPagerProps,
} from './viewPager/viewPager.component';
import {
  ButtonIconAlignment,
  ButtonIconAlignments,
} from './button/type';
import {
  Placement as PopoverPlacement,
  Placements as PopoverPlacements,
} from './popover/type';
import {
  TopNavigationAlignment,
  TopNavigationAlignments,
} from './topNavigation/type';

const Avatar = styled<AvatarProps>(AvatarComponent, 'Avatar');
const BottomNavigationTab = styled<BottomNavigatorTabProps>(BottomNavigationTabComponent, 'BottomNavigationTab');
const BottomNavigation = styled<BottomTabNavigatorProps>(BottomNavigationComponent, 'BottomNavigation');
const Button = styled<ButtonProps>(ButtonComponent, 'Button');
const ButtonGroup = styled<ButtonGroupProps>(ButtonGroupComponent, 'ButtonGroup');
const CheckBox = styled<CheckBoxProps>(CheckBoxComponent, 'CheckBox');
const Input = styled<InputProps>(InputComponent, 'Input');
const Layout = styled<LayoutProps>(LayoutComponent, 'Layout');
const List = styled<ListProps>(ListComponent, 'List');
const ListItem = styled<ListItemProps>(ListItemComponent, 'ListItem');
const OverflowMenu = styled<OverflowMenuProps>(OverflowMenuComponent, 'OverflowMenu');
const OverflowMenuItem = styled<OverflowMenuItemProps>(OverflowMenuItemComponent, 'OverflowMenuItem');
const Popover = styled<PopoverProps>(PopoverComponent, 'Popover');
const Radio = styled<RadioProps>(RadioComponent, 'Radio');
const RadioGroup = styled<RadioGroupProps>(RadioGroupComponent, 'RadioGroup');
const Tab = styled<TabProps>(TabComponent, 'Tab');
const TabBar = styled<TabBarProps>(TabBarComponent, 'TabBar');
const Text = styled<TextProps>(TextComponent, 'Text');
const Toggle = styled<ToggleProps>(ToggleComponent, 'Toggle');
const Tooltip = styled<TooltipProps>(TooltipComponent, 'Tooltip');
const TopNavigation = styled<TopNavigationBarProps>(TopNavigationComponent, 'TopNavigation');
const TopNavigationAction = styled<TopNavigationBarActionProps>(TopNavigationActionComponent, 'TopNavigationAction');

export {
  Avatar,
  BottomNavigationTab,
  BottomNavigation,
  Button,
  ButtonGroup,
  CheckBox,
  Input,
  Layout,
  List,
  ListItem,
  Modal,
  Popover,
  Radio,
  RadioGroup,
  Tab,
  TabBar,
  TabView,
  Text,
  Toggle,
  Tooltip,
  TopNavigation,
  TopNavigationAction,
  ViewPager,
  OverflowMenu,
  OverflowMenuItem,
};

export {
  AvatarProps,
  BottomNavigatorTabProps,
  BottomTabNavigatorProps,
  ButtonProps,
  ButtonGroupProps,
  CheckBoxProps,
  InputProps,
  LayoutProps,
  ListProps,
  ListItemProps,
  ModalProps,
  PopoverProps,
  RadioProps,
  RadioGroupProps,
  TabProps,
  TabBarProps,
  TabViewProps,
  TextProps,
  TooltipProps,
  ToggleProps,
  TopNavigationBarProps,
  TopNavigationBarActionProps,
  ViewPagerProps,
  OverflowMenuProps,
  OverflowMenuItemProps,
};

export {
  ButtonIconAlignment,
  ButtonIconAlignments,
  PopoverPlacement,
  PopoverPlacements,
  TopNavigationAlignment,
  TopNavigationAlignments,
  OverflowMenuItemType,
};
