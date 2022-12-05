/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Animated,
  Easing,
  Platform,
} from 'react-native';
import {
  Animation,
  AnimationConfig,
} from '../animation/animation';

const DEFAULT_CONFIG: CircularProgressBarAnimationConfig = {
  duration: 500,
  easing: Easing.linear,
  cycles: 1,
  useNativeDriver: Platform.OS !== 'web',
};

interface AnimationStyle {
  rotateFirstHalf: Animated.AnimatedInterpolation<string>;
  rotateSecondHalf: Animated.AnimatedInterpolation<string>;
}

type TimingAnimationConfig = Omit<Animated.TimingAnimationConfig, 'toValue'>;

export type CircularProgressBarAnimationConfig = AnimationConfig & TimingAnimationConfig;

export class CircularProgressBarAnimation extends Animation<CircularProgressBarAnimationConfig, AnimationStyle> {

  private toValue: number;
  private readonly animationValue: Animated.Value;

  constructor(config?: Partial<CircularProgressBarAnimationConfig>) {
    super({ ...DEFAULT_CONFIG, ...config });
    this.animationValue = new Animated.Value(0);
  }

  protected get animation(): Animated.CompositeAnimation {
    return Animated.timing(
      this.animationValue,
      {
        ...this.config,
        toValue: this.toValue,
      },
    );
  }

  public startDeterminate(toValue: number, callback?: Animated.EndCallback): void {
    this.toValue = toValue;
    super.start(callback);
  }

  public stop(): void {
    super.stop();
  }

  public toProps(): AnimationStyle {
    return {
      rotateFirstHalf: this.createRotateFirstHalfInterpolation(),
      rotateSecondHalf: this.createRotateSecondHalfInterpolation(),
    };
  }

  private createRotateFirstHalfInterpolation = (): Animated.AnimatedInterpolation<string> => {
    return this.animationValue.interpolate({
      inputRange: [0, 0.5],
      outputRange: ['180deg', '360deg'],
      extrapolate: 'clamp',
    });
  };

  private createRotateSecondHalfInterpolation = (): Animated.AnimatedInterpolation<string> => {
    return this.animationValue.interpolate({
      inputRange: [0.5, 1],
      outputRange: ['180deg', '360deg'],
      extrapolate: 'clamp',
    });
  };

}
