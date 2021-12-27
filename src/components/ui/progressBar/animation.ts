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
import { TransformProps } from 'react-native-svg';

const DEFAULT_CONFIG: ProgressBarAnimationConfig = {
  duration: 1000,
  easing: Easing.linear,
  cycles: 1,
  useNativeDriver: Platform.OS !== 'web',
};

interface ProgressBaryAnimationStyle {
  transform: Animated.AnimatedProps<TransformProps>[];
}

type TimingAnimationConfig = Omit<Animated.TimingAnimationConfig, 'toValue'>;

type ProgressBarAnimationConfig = AnimationConfig & TimingAnimationConfig;

export class ProgressBarAnimation extends Animation<ProgressBarAnimationConfig, ProgressBaryAnimationStyle> {

  private toValue: number;
  private animationValue: Animated.Value;

  constructor(config?: ProgressBarAnimationConfig) {
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

  // @ts-ignore: FIXME
  public toProps(width: number): ProgressBaryAnimationStyle {
    return {
      transform: [
        { translateX: this.createTranslateXInterpolation(width) },
        { scaleX: this.createScaleXInterpolation() },
      ],
    };
  }

  private createTranslateXInterpolation = (width: number): Animated.AnimatedInterpolation => {
    return this.animationValue.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ -0.5 * width, 0 ],
      });
  };

  private createScaleXInterpolation = (): Animated.AnimatedInterpolation => {
    return this.animationValue.interpolate({
      inputRange: [ 0, 1 ],
      outputRange: [ 0.0001, 1 ],
    });
  };

}
