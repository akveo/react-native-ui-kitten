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
  CheckBox as CheckBoxComponent,
  Props as CheckBoxProps,
} from './checkbox/checkbox.component';

const Radio = styled<RadioComponent, RadioProps>(RadioComponent);
const RadioGroup = styled<RadioGroupComponent, RadioGroupProps>(RadioGroupComponent);
const CheckBox = styled<CheckBoxComponent, CheckBoxProps>(CheckBoxComponent);

export {
  Radio,
  RadioGroup,
  CheckBox,
  RadioProps,
  RadioGroupProps,
  CheckBoxProps,
};

