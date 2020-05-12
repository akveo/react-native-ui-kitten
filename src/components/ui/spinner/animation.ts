/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Animated,
  Easing,
  EasingFunction,
  Platform,
  ViewStyle,
} from 'react-native';
import {
  Animation,
  AnimationConfig,
} from '../animation/animation';

const PI: number = 180;
const PI2: number = 360;
const OFFSET_MIN: number = PI / 12;
const OFFSET_MAX: number = PI / 6;

const BaseBezierEasing: EasingFunction = Easing.bezier(0.4, 0.0, 0.7, 1.0);

const StartArcEasing: EasingFunction = (progress: number): number => {
  return -PI + OFFSET_MIN + (PI - OFFSET_MAX) * BaseBezierEasing(progress);
};

const EndArcEasing: EasingFunction = (progress: number): number => {
  return PI2 - OFFSET_MIN + (-PI + OFFSET_MAX) * BaseBezierEasing(progress);
};

const DEFAULT_CONFIG: SpinnerAnimationConfig = {
  duration: 2400,
  easing: Easing.linear,
  cycles: -1,
  useNativeDriver: Platform.OS !== 'web',
};

type TimingAnimationConfig = Omit<Animated.TimingAnimationConfig, 'toValue'>;

export interface SpinnerAnimationStyle {
  container: ViewStyle;
  start: ViewStyle;
  end: ViewStyle;
}

export type SpinnerAnimationConfig = AnimationConfig & TimingAnimationConfig;

/**
 * Animates a Spinner in a Material Design way.
 *
 * Thanks these guys for open sourcing the algorithm: https://github.com/n4kz/react-native-indicators
 */
export class SpinnerAnimation extends Animation<SpinnerAnimationConfig, SpinnerAnimationStyle> {

  private animationValue: Animated.Value;
  private animationFrames: number[];
  private arcSize: number;

  constructor(arcSize: number, config?: SpinnerAnimationConfig) {
    super({ ...DEFAULT_CONFIG, ...config });
    this.arcSize = arcSize;
    this.animationValue = new Animated.Value(0);
    this.animationFrames = this.createFrameRange(this.config.duration);
  }

  protected get animation(): Animated.CompositeAnimation {
    return Animated.timing(this.animationValue, { toValue: 1.0, ...this.config });
  }

  public start(callback?: Animated.EndCallback) {
    // reset animation value before the next animation cycle
    this.animationValue.setValue(0);
    super.start(callback);
  }

  public stop() {
    super.stop();
    this.animationValue.setValue(0);
  }

  /**
   * @returns {SpinnerAnimationStyle} - an object that contains container, start and end arcs transform styles.
   */
  public toProps(): SpinnerAnimationStyle {
    const containerInterpolation: Animated.AnimatedInterpolation = this.createContainerInterpolation();
    const startArcInterpolation: Animated.AnimatedInterpolation = this.createArcInterpolation(StartArcEasing);
    const endArcInterpolation: Animated.AnimatedInterpolation = this.createArcInterpolation(EndArcEasing);

    return {
      container: this.toStyleTransformProp(containerInterpolation),
      start: this.toStyleTransformProp(startArcInterpolation),
      end: this.toStyleTransformProp(endArcInterpolation, {
        transform: [{ translateY: -this.arcSize / 2 }],
      }),
    };
  }

  /**
   * @param {number} duration - animation duration.
   * @returns an array of frames fitted into animation.
   */
  private createFrameRange = (duration: number): number[] => {
    const numberOfFrames: number = 60 * duration / 1000;

    return new Array(numberOfFrames).fill(0);
  };

  private createContainerInterpolation = (): Animated.AnimatedInterpolation => {
    return this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        this.toDegValue(OFFSET_MAX + OFFSET_MIN),
        this.toDegValue((2 * PI2 + OFFSET_MAX + OFFSET_MIN)),
      ],
    });
  };

  private createArcInterpolation = (easing: EasingFunction): Animated.AnimatedInterpolation => {
    return this.animationValue.interpolate({
      inputRange: this.createArcInterpolationInputRange(),
      outputRange: this.createArcInterpolationOutputRange(easing),
    });
  };

  /**
   * Maps the animation frames into initial animation values specific for each frame.
   *
   * @returns a container interpolation input range in a numeric format.
   */
  private createArcInterpolationInputRange = (): number[] => {
    return this.animationFrames.map((item: number, frame: number): number => {
      return frame / (this.animationFrames.length - 1);
    });
  };

  /**
   * Maps the animation frames into a final animation values specific for each frame.
   *
   * @param {(progress: number) => number} easing - Easing function specific for the arc.
   * @returns an arc interpolation end values eased with an `easing` function in a StyleSheet degree format.
   */
  private createArcInterpolationOutputRange = (easing: EasingFunction): string[] => {
    return this.animationFrames.map((item: number, frame: number): string => {
      const progress: number = 2 * frame / (this.animationFrames.length - 1);
      const boundedProgress: number = Math.min(2.0 - progress, progress);

      return this.toDegValue(easing(boundedProgress));
    });
  };

  /**
   * @param {Animated.AnimatedInterpolation} rotate - animated rotation animationValue.
   * @param {ViewStyle} source - initial StyleSheet object.
   * @returns a final StyleSheet object with a `rotate` animation value.
   */
  private toStyleTransformProp = (rotate: Animated.AnimatedInterpolation, source: ViewStyle = {}): ViewStyle => {
    const transform = [...(source.transform || []), { rotate }];

    // @ts-ignore: AnimatedInterpolation does not fit RotateTransform type declaration
    return { ...source, transform };
  };

  /**
   * @param {number} source - degrees in a numeric format.
   * @returns degrees in a StyleSheet format.
   */
  private toDegValue = (source: number): string => {
    return `${source}deg`;
  };
}
