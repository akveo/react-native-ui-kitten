import { styled } from '@kitten/theme';
import {
  Radio,
  Props,
} from './radio/radio.component';
import {
  Layout,
  LayoutProps,
} from './layout/layout.component';

const StyledRadio = styled<Radio, Props>(Radio);
const StyledLayout = styled<Layout, LayoutProps>(Layout);

export {
  StyledRadio as Radio,
  Props as RadioProps,
  StyledLayout as Layout,
  LayoutProps,
};

