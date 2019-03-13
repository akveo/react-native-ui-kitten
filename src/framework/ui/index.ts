import { styled } from '@kitten/theme';
import {
  Avatar as AvatarComponent,
  Props as AvatarProps,
} from './avatar/avatar.component';
import {
  Button as ButtonComponent,
  Props as ButtonProps,
} from './button/button.component';
import {
  ButtonGroup as ButtonGroupComponent,
  Props as ButtonGroupProps,
} from './buttonGroup/buttonGroup.component';
import {
  Input as InputComponent,
  Props as InputProps,
} from './input/input.component';
import {
  Text as TextComponent,
  Props as TextProps,
} from './text/text.component';
import {
  Radio as RadioComponent,
  Props as RadioProps,
} from './radio/radio.component';
import {
  RadioGroup as RadioGroupComponent,
  Props as RadioGroupProps,
} from './radioGroup/radioGroup.component';
import {
  Layout as LayoutComponent,
  Props as LayoutProps,
} from './layout/layout.component';
import {
  Toggle as ToggleComponent,
  Props as ToggleProps,
} from './toggle/toggle.component';
import {
  CheckBox as CheckBoxComponent,
  Props as CheckBoxProps,
} from './checkbox/checkbox.component';
import {
  Tab as TabComponent,
  Props as TabProps,
} from './tab/tab.component';
import {
  TabBar as TabBarComponent,
  Props as TabBarProps,
} from './tab/tabBar.component';
import {
  Popover as PopoverComponent,
  Props as PopoverProps,
} from './popover/popover.component';
import {
  Tooltip as TooltipComponent,
  Props as TooltipProps,
} from './tooltip/tooltip.component';
import {
  ViewPager,
  Props as ViewPagerProps,
} from './viewPager/viewPager.component';
import {
  TabView,
  Props as TabViewProps,
} from './tab/tabView.component';
import {
  BottomTabNavigator as BottomTabNavigatorComponent,
  Props as BottomTabNavigatorProps,
} from './tabNavigator/bottomTabNavigator.component';
import {
  TopNavigationBar as TopNavigationBarComponent,
  Props as TopNavigationBarProps,
} from './topNavigationBar/topNavigationBar.component';
import {
  TopNavigationBarAction as TopNavigationBarActionComponent,
  Props as TopNavigationBarActionProps,
} from './topNavigationBar/topNavigationBarAction.component';
import {
  BottomNavigatorTab as BottomNavigatorTabComponent,
  Props as BottomNavigatorTabProps,
} from './tabNavigator/bottomNavigatorTab.component';
import {
  Modal as ModalComponent,
  Props as ModalProps,
} from './modal/modal.component';
import {
  ButtonAlignment,
  ButtonAlignments,
} from './button/type';
import {
  Placement as PopoverPlacement,
  Placements as PopoverPlacements,
} from './popover/type';

const Avatar = styled<AvatarComponent, AvatarProps>(AvatarComponent);
const Button = styled<ButtonComponent, ButtonProps>(ButtonComponent);
const ButtonGroup = styled<ButtonGroupComponent, ButtonGroupProps>(ButtonGroupComponent);
const Input = styled<InputComponent, InputProps>(InputComponent);
const Text = styled<TextComponent, TextProps>(TextComponent);
const Radio = styled<RadioComponent, RadioProps>(RadioComponent);
const RadioGroup = styled<RadioGroupComponent, RadioGroupProps>(RadioGroupComponent);
const Layout = styled<LayoutComponent, LayoutProps>(LayoutComponent);
const Toggle = styled<ToggleComponent, ToggleProps>(ToggleComponent);
const CheckBox = styled<CheckBoxComponent, CheckBoxProps>(CheckBoxComponent);
const Tab = styled<TabComponent, TabProps>(TabComponent);
const TabBar = styled<TabBarComponent, TabBarProps>(TabBarComponent);
const Popover = styled<PopoverComponent, PopoverProps>(PopoverComponent);
const Tooltip = styled<TooltipComponent, TooltipProps>(TooltipComponent);
const BottomTabNavigator = styled<BottomTabNavigatorComponent, BottomTabNavigatorProps>(BottomTabNavigatorComponent);
const BottomNavigatorTab = styled<BottomNavigatorTabComponent, BottomNavigatorTabProps>(BottomNavigatorTabComponent);
const TopNavigationBar = styled<TopNavigationBarComponent, TopNavigationBarProps>(TopNavigationBarComponent);
const TopNavigationBarAction =
  styled<TopNavigationBarActionComponent, TopNavigationBarActionProps>(TopNavigationBarActionComponent);
const Modal = styled<ModalComponent, ModalProps>(ModalComponent);

export {
  Avatar,
  Button,
  ButtonGroup,
  Input,
  Text,
  Layout,
  LayoutProps,
  Radio,
  RadioProps,
  RadioGroup,
  RadioGroupProps,
  Toggle,
  ToggleProps,
  CheckBox,
  Tab,
  TabBar,
  Popover,
  Tooltip,
  ViewPager,
  TabView,
  AvatarProps,
  ButtonProps,
  InputProps,
  ButtonGroupProps,
  CheckBoxProps,
  TabProps,
  TabBarProps,
  PopoverProps,
  TooltipProps,
  ViewPagerProps,
  TabViewProps,
  BottomTabNavigator,
  BottomTabNavigatorProps,
  BottomNavigatorTab,
  BottomNavigatorTabProps,
  TopNavigationBar,
  TopNavigationBarProps,
  TopNavigationBarAction,
  TopNavigationBarActionProps,
  Modal,
  ModalProps,
  ButtonAlignment,
  ButtonAlignments,
  PopoverPlacement,
  PopoverPlacements,
};
