/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ViewStyle } from 'react-native';
import {
  Animation,
  AnimationConfig,
  PulseAnimation,
  ShakeAnimation,
  ZoomAnimation,
} from '../animation';

export type IconAnimation = Animation<AnimationConfig, ViewStyle>;

export interface IconAnimationRegistry {
  zoom: IconAnimation;
  pulse: IconAnimation;
  shake: IconAnimation;
}

export function getIconAnimation(
  animation?: keyof IconAnimationRegistry | null,
  config?: AnimationConfig): IconAnimation | null {
  switch (animation) {
    case 'zoom':
      return new ZoomAnimation(config);
    case 'pulse':
      return new PulseAnimation(config);
    case 'shake':
      return new ShakeAnimation(config);
    default:
      return null;
  }
}
