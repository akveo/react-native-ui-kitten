import { ViewStyle } from 'react-native';
import {
  Animation,
  PulseAnimation,
  ShakeAnimation,
  ZoomAnimation,
} from '../animation';

export type IconAnimation = Animation<any, ViewStyle>;

export interface IconAnimationRegistry {
  zoom: IconAnimation;
  pulse: IconAnimation;
  shake: IconAnimation;
}

export const IconAnimations: IconAnimationRegistry = {
  zoom: new ZoomAnimation(),
  pulse: new PulseAnimation(),
  shake: new ShakeAnimation(),
};
