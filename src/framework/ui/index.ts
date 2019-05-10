import { styled } from '@kitten/theme';
import {
  Avatar as AvatarComponent,
  AvatarProps,
} from './avatar/avatar.component';
import {
  BottomNavigationTab as BottomNavigationTabComponent,
  BottomNavigationTabProps,
} from './bottomNavigation/bottomNavigationTab.component';
import {
  BottomNavigation as BottomNavigationComponent,
  BottomNavigationProps,
} from './bottomNavigation/bottomNavigation.component';
import {
  Button as ButtonComponent,
  ButtonProps,
} from './button/button.component';
import {
  ButtonGroup as ButtonGroupComponent,
  ButtonGroupProps,
} from './buttonGroup/buttonGroup.component';
import {
  CheckBox as CheckBoxComponent,
  CheckBoxProps,
} from './checkbox/checkbox.component';
import {
  Input as InputComponent,
  InputProps,
} from './input/input.component';
import {
  Layout as LayoutComponent,
  LayoutProps,
} from './layout/layout.component';
import {
  List as ListComponent,
  ListProps,
} from './list/list.component';
import {
  ListItem as ListItemComponent,
  ListItemProps,
} from './list/listItem.component';
import {
  Modal,
  ModalProps,
} from './modal/modal.component';
import {
  OverflowMenu as OverflowMenuComponent,
  OverflowMenuProps,
} from './overflowMenu/overflowMenu.component';
import {
  OverflowMenuItem as OverflowMenuItemComponent,
  OverflowMenuItemProps,
  OverflowMenuItemType,
} from './overflowMenu/overflowMenuItem.component';
import {
  Popover as PopoverComponent,
  PopoverProps,
} from './popover/popover.component';
import {
  Radio as RadioComponent,
  RadioProps,
} from './radio/radio.component';
import {
  RadioGroup as RadioGroupComponent,
  RadioGroupProps,
} from './radioGroup/radioGroup.component';
import {
  Tab as TabComponent,
  TabProps,
} from './tab/tab.component';
import {
  TabBar as TabBarComponent,
  TabBarProps,
} from './tab/tabBar.component';
import {
  TabView,
  TabViewProps,
} from './tab/tabView.component';
import {
  Text as TextComponent,
  TextProps,
} from './text/text.component';
import {
  Toggle as ToggleComponent,
  ToggleProps,
} from './toggle/toggle.component';
import {
  Tooltip as TooltipComponent,
  TooltipProps,
} from './tooltip/tooltip.component';
import {
  TopNavigation as TopNavigationComponent,
  TopNavigationProps,
} from './topNavigation/topNavigation.component';
import {
  TopNavigationAction as TopNavigationActionComponent,
  TopNavigationActionProps,
} from './topNavigation/topNavigationAction.component';
import {
  ViewPager,
  ViewPagerProps,
} from './viewPager/viewPager.component';
import {
  ButtonIconAlignment,
  ButtonIconAlignments,
} from './button/type';
import {
  PopoverPlacement,
  PopoverPlacements,
} from './popover/type';
import {
  TopNavigationAlignment,
  TopNavigationAlignments,
} from './topNavigation/type';

const Avatar = styled<AvatarProps>(AvatarComponent);
const BottomNavigationTab = styled<BottomNavigationTabProps>(BottomNavigationTabComponent);
const BottomNavigation = styled<BottomNavigationProps>(BottomNavigationComponent);
const Button = styled<ButtonProps>(ButtonComponent);
const ButtonGroup = styled<ButtonGroupProps>(ButtonGroupComponent);
const CheckBox = styled<CheckBoxProps>(CheckBoxComponent);
const Input = styled<InputProps>(InputComponent);
const Layout = styled<LayoutProps>(LayoutComponent);
const List = styled<ListProps>(ListComponent);
const ListItem = styled<ListItemProps>(ListItemComponent);
const OverflowMenu = styled<OverflowMenuProps>(OverflowMenuComponent);
const OverflowMenuItem = styled<OverflowMenuItemProps>(OverflowMenuItemComponent);
const Popover = styled<PopoverProps>(PopoverComponent);
const Radio = styled<RadioProps>(RadioComponent);
const RadioGroup = styled<RadioGroupProps>(RadioGroupComponent);
const Tab = styled<TabProps>(TabComponent);
const TabBar = styled<TabBarProps>(TabBarComponent);
const Text = styled<TextProps>(TextComponent);
const Toggle = styled<ToggleProps>(ToggleComponent);
const Tooltip = styled<TooltipProps>(TooltipComponent);
const TopNavigation = styled<TopNavigationProps>(TopNavigationComponent);
const TopNavigationAction = styled<TopNavigationActionProps>(TopNavigationActionComponent);

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
  BottomNavigationTabProps,
  BottomNavigationProps,
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
  TopNavigationProps,
  TopNavigationActionProps,
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
