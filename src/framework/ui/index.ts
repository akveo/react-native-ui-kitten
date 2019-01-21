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
  Layout as LayoutComponent,
  Props as LayoutProps,
} from './layout/layout.component';

const Radio = styled<RadioComponent, RadioProps>(RadioComponent);
const RadioGroup = styled<RadioGroupComponent, RadioGroupProps>(RadioGroupComponent);
const Layout = styled<LayoutComponent, LayoutProps>(LayoutComponent);

export {
  Radio, RadioProps,
  RadioGroup, RadioGroupProps,
  Layout, LayoutProps,
};

