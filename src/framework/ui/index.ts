import { styled } from '@kitten/theme';
import {
  Radio as RadioComponent,
  Props as RadioProps,
} from './radio/radio.component';
import {
  RadioGroup as RadioGroupComponent,
  Props as RadioGroupProps,
} from './radioGroup/radioGroup.component';

const Radio = styled<RadioComponent, RadioProps>(RadioComponent);
const RadioGroup = styled<RadioGroupComponent, RadioGroupProps>(RadioGroupComponent);

export {
  Radio,
  RadioGroup,
  RadioProps,
  RadioGroupProps,
};

