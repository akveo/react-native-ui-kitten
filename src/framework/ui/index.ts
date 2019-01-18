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
  Layout,
  LayoutProps,
} from './layout/layout.component';

const Radio = styled<RadioComponent, RadioProps>(RadioComponent);
const RadioGroup = styled<RadioGroupComponent, RadioGroupProps>(RadioGroupComponent);
const StyledLayout = styled<Layout, LayoutProps>(Layout);

export {
  Radio, RadioProps,
  RadioGroup, RadioGroupProps,
  StyledLayout as Layout, LayoutProps,
};

