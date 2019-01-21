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

const Radio = styled<RadioComponent, RadioProps>(RadioComponent);
const RadioGroup = styled<RadioGroupComponent, RadioGroupProps>(RadioGroupComponent);
const Toggle = styled<ToggleComponent, ToggleProps>(ToggleComponent);

export {
  Radio, RadioProps,
  RadioGroup, RadioGroupProps,
  Toggle, ToggleProps,
};

