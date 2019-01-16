import { styled } from '@kitten/theme';
import {
  Radio,
  Props,
} from './radio/radio.component';

const StyledRadio = styled<Radio, Props>(Radio);

export {
  StyledRadio as Radio,
  Props as RadioProps,
};

