import { styled } from '@kitten/theme';
import {
  Avatar as AvatarComponent,
  Props as AvatarProps,
} from './avatar/avatar.component';
import {
  BottomNavigatorTab as BottomNavigatorTabComponent,
  Props as BottomNavigatorTabProps,
} from './tabNavigator/bottomNavigatorTab.component';
import {
  BottomTabNavigator as BottomTabNavigatorComponent,
  Props as BottomTabNavigatorProps,
} from './tabNavigator/bottomTabNavigator.component';
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
  Modal as ModalComponent,
  Props as ModalProps,
} from './modal/modal.component';
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
  TopNavigationBar as TopNavigationBarComponent,
  Props as TopNavigationBarProps,
} from './topNavigationBar/topNavigationBar.component';
import {
  TopNavigationBarAction as TopNavigationBarActionComponent,
  Props as TopNavigationBarActionProps,
} from './topNavigationBar/topNavigationBarAction.component';
import {
  ViewPager,
  Props as ViewPagerProps,
} from './viewPager/viewPager.component';
import {
  ButtonAlignment,
  ButtonAlignments,
} from './button/type';
import {
  Placement as PopoverPlacement,
  Placements as PopoverPlacements,
} from './popover/type';
import {
  OverflowMenuItem as OverflowMenuItemComponent,
  Props as OverflowMenuItemProps,
  OverflowMenuItemType,
} from './overflowMenu/overflowMenuItem.component';
import {
  OverflowMenu as OverflowMenuComponent,
  Props as OverflowMenuProps,
} from './overflowMenu/overflowMenu.component';

const Avatar = styled<AvatarComponent, AvatarProps>(AvatarComponent);
const BottomNavigatorTab = styled<BottomNavigatorTabComponent, BottomNavigatorTabProps>(BottomNavigatorTabComponent);
const BottomTabNavigator = styled<BottomTabNavigatorComponent, BottomTabNavigatorProps>(BottomTabNavigatorComponent);
const Button = styled<ButtonComponent, ButtonProps>(ButtonComponent);
const ButtonGroup = styled<ButtonGroupComponent, ButtonGroupProps>(ButtonGroupComponent);
const CheckBox = styled<CheckBoxComponent, CheckBoxProps>(CheckBoxComponent);
const Input = styled<InputComponent, InputProps>(InputComponent);
const Layout = styled<LayoutComponent, LayoutProps>(LayoutComponent);
const List = styled<ListComponent, ListProps>(ListComponent);
const ListItem = styled<ListItemComponent, ListItemProps>(ListItemComponent);
const Modal = styled<ModalComponent, ModalProps>(ModalComponent);
const Popover = styled<PopoverComponent, PopoverProps>(PopoverComponent);
const Radio = styled<RadioComponent, RadioProps>(RadioComponent);
const RadioGroup = styled<RadioGroupComponent, RadioGroupProps>(RadioGroupComponent);
const Tab = styled<TabComponent, TabProps>(TabComponent);
const TabBar = styled<TabBarComponent, TabBarProps>(TabBarComponent);
const Text = styled<TextComponent, TextProps>(TextComponent);
const Toggle = styled<ToggleComponent, ToggleProps>(ToggleComponent);
const Tooltip = styled<TooltipComponent, TooltipProps>(TooltipComponent);
const TopNavigationBar = styled<TopNavigationBarComponent, TopNavigationBarProps>(TopNavigationBarComponent);
const TopNavigationBarAction =
  styled<TopNavigationBarActionComponent, TopNavigationBarActionProps>(TopNavigationBarActionComponent);
const OverflowMenuItem = styled<OverflowMenuItemComponent, OverflowMenuItemProps>(OverflowMenuItemComponent);
const OverflowMenu = styled<OverflowMenuComponent, OverflowMenuProps>(OverflowMenuComponent);

export {
  Avatar,
  BottomNavigatorTab,
  BottomTabNavigator,
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
  TopNavigationBar,
  TopNavigationBarAction,
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
  TooltipProps,
  ToggleProps,
  TopNavigationBarProps,
  TopNavigationBarActionProps,
  ViewPagerProps,
  OverflowMenuProps,
  OverflowMenuItemProps,
};

export {
  ButtonAlignment,
  ButtonAlignments,
  PopoverPlacement,
  PopoverPlacements,
  OverflowMenuItemType,
};
