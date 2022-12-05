/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Animated,
  Easing,
  Platform,
  ViewStyle,
} from 'react-native';
import {
  Animation,
  AnimationConfig,
} from '../animation/animation';

const DEFAULT_CONFIG: ProgressBarAnimationConfig = {
  duration: 500,
  easing: Easing.linear,
  cycles: 1,
  useNativeDriver: Platform.OS !== 'web',
};

type ProgressBarAnimationStyle = Animated.AnimatedProps<ViewStyle>;

type TimingAnimationConfig = Omit<Animated.TimingAnimationConfig, 'toValue'>;

export type ProgressBarAnimationConfig = AnimationConfig & TimingAnimationConfig;

export class ProgressBarAnimation extends Animation<ProgressBarAnimationConfig, ProgressBarAnimationStyle> {

  private toValue: number;

  private barWidth = 0;

  private readonly animationValue: Animated.Value;

  constructor(config?: Partial<ProgressBarAnimationConfig>) {
    super({ ...DEFAULT_CONFIG, ...config });
    this.animationValue = new Animated.Value(0);
  }

  public setBarWidth(value: number): void {
    this.barWidth = value;
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

  public toProps(): ProgressBarAnimationStyle {
    return {
      transform: [
        { translateX: this.createTranslateXInterpolation() },
      ],
    };
  }

  private createTranslateXInterpolation = (): Animated.AnimatedInterpolation<number> => {
    return this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-this.barWidth, 0],
    });
  };
}
