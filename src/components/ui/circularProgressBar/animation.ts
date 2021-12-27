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

const DEFAULT_CONFIG: ComponentAnimationConfig = {
  duration: 1000,
  easing: Easing.linear,
  cycles: 1,
  useNativeDriver: Platform.OS !== 'web',
};

interface AnimationStyle {
  rotateFirstHalf: Animated.AnimatedInterpolation;
  rotateSecondHalf: Animated.AnimatedInterpolation;
  opacity: Animated.AnimatedInterpolation;
}

type TimingAnimationConfig = Omit<Animated.TimingAnimationConfig, 'toValue'>;

type ComponentAnimationConfig = AnimationConfig & TimingAnimationConfig;

export class CircularProgressBarAnimation extends Animation<ComponentAnimationConfig, AnimationStyle> {

  private toValue: number;
  private animationValue: Animated.Value;

  constructor(config?: ComponentAnimationConfig) {
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
      opacity: this.createOpacityInterpolation(),
    };
  }

  private createOpacityInterpolation = (): Animated.AnimatedInterpolation => {
    return this.animationValue.interpolate({
      inputRange: [ 0, 0.5, 0.5, 1 ],
      outputRange: [ 1, 1, 0, 0 ],
      extrapolate: 'clamp',
    });
  };

  private createRotateFirstHalfInterpolation = (): Animated.AnimatedInterpolation => {
    return this.animationValue.interpolate({
      inputRange: [ 0, 0.5 ],
      outputRange: [ '0deg', '180deg' ],
      extrapolate: 'clamp',
    });
  };

  private createRotateSecondHalfInterpolation = (): Animated.AnimatedInterpolation => {
    return this.animationValue.interpolate({
      inputRange: [ 0.5, 1 ],
      outputRange: [ '0deg', '180deg' ],
      extrapolate: 'clamp',
    });
  };

}
