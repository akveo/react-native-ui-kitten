import { ViewStyle } from 'react-native';
import {
  Animation,
  PulseAnimation,
  ShakeAnimation,
  ZoomAnimation,
  AnimationConfig,
} from '../animation';

export type IconAnimation = Animation<any, ViewStyle>;

export interface IconAnimationRegistry {
  zoom: IconAnimation;
  pulse: IconAnimation;
  shake: IconAnimation;
}

export function getIconAnimation(animation?: keyof IconAnimationRegistry,
                                 config?: AnimationConfig): IconAnimation {

  const IconAnimations: IconAnimationRegistry = {
    zoom: new ZoomAnimation(config),
    pulse: new PulseAnimation(config),
    shake: new ShakeAnimation(config),
  };

  return IconAnimations[animation];
}
