import { styled } from '@kitten/theme';
import {
  Radio as RadioComponent,
  Props as RadioProps,
} from './radio/radio.component';
import {
  RadioGroup as RadioGroupComponent,
  Props as RadioGroupProps,
} from './radioGroup/radioGroup.component';
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
  ViewPager,
  Props as ViewPagerProps,
} from './viewPager/viewPager.component';
import {
  TabView,
  Props as TabViewProps,
} from './tab/tabView.component';

const Radio = styled<RadioComponent, RadioProps>(RadioComponent);
const RadioGroup = styled<RadioGroupComponent, RadioGroupProps>(RadioGroupComponent);
const Toggle = styled<ToggleComponent, ToggleProps>(ToggleComponent);
const CheckBox = styled<CheckBoxComponent, CheckBoxProps>(CheckBoxComponent);
const Tab = styled<TabComponent, TabProps>(TabComponent);
const TabBar = styled<TabBarComponent, TabBarProps>(TabBarComponent);

export {
  Radio,
  RadioProps,
  RadioGroup,
  RadioGroupProps,
  Toggle,
  ToggleProps,
  CheckBox,
  Tab,
  TabBar,
  ViewPager,
  TabView,
  CheckBoxProps,
  TabProps,
  TabBarProps,
  ViewPagerProps,
  TabViewProps,
};

