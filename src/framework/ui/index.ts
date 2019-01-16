import { styled } from '@kitten/theme';
import {
  Radio,
  Props,
} from './radio/radio.component';
import {
  Toggle,
  ToggleProps,
} from './toggle/toggle.component';

const StyledRadio = styled<Radio, Props>(Radio);
const StyledToggle = styled<Toggle, ToggleProps>(Toggle);

export {
  StyledRadio as Radio,
  Props as RadioProps,
  StyledToggle as Toggle,
  ToggleProps,
};

