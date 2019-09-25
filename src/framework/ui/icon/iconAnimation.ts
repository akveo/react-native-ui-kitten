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

  switch (animation) {
    case 'zoom':
      return new ZoomAnimation(config);
    case 'pulse':
      return new PulseAnimation(config);
    case 'shake':
      return new ShakeAnimation(config);
  }
}
