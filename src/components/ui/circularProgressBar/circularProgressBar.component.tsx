/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { NumberProp } from 'react-native-svg';
import {
  EvaSize,
  EvaStatus,
  LiteralUnion,
  Overwrite,
} from '@ui-kitten/components/devsupport';
import {
  Icon,
  IconProps,
  styled,
  StyledComponentProps,
  StyleType,
} from '@ui-kitten/components';
import { CircularProgressBarAnimation } from './animation';

type CircularProgressBarStyledProps = Overwrite<StyledComponentProps, {
  appearance?: LiteralUnion<'default'>;
}>;

interface IndicatorStyle {
  width: number;
  color: string;
}

interface IconStyle {
  width: number;
  tintColor: string;
}

interface ComponentStyles {
  radius: number;
  track: IndicatorStyle;
  indicator: IndicatorStyle;
  container: ViewStyle;
  icon: IconStyle;
  text: TextStyle;
}

type LoadingStates = LiteralUnion<'success' | 'error'>;

export interface CircularProgressBarProps extends ViewProps, CircularProgressBarStyledProps {
  progress?: number;
  animating?: boolean;
  status?: EvaStatus;
  size?: EvaSize;
  state?: LoadingStates;
}

export type CircularProgressBarElement = React.ReactElement<CircularProgressBarProps>;

/**
 * Displays the length of a process.
 *
 * @extends React.Component
 *
 * @property {boolean} animating - Whether component is animating.
 * Default is *true*.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *primary*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {string} size - Size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Defaults to *medium*.
 *
 * @property {string} state - State of the process.
 * Can be `success` or `error`.
 * No default value.
 *
 * @property {number} progress - Current progress value of the process.
 * Can be from 0 to 1.
 *
 * @overview-example CircularProgressBarSimpleUsage
 * Default CircularProgressBar status is `primary` and size is `medium`.
 *
 * @overview-example CircularProgressBarSizes
 * To resize CircularProgressBar, a `size` property may be used.
 *
 * @overview-example CircularProgressBarStates
 * To show the specific state of the process, a `state` property may be used.
 *
 * @overview-example CircularProgressBarStatuses
 * A color can be changed with `status` property
 * An extra status is `control`, which is designed to be used on high-contrast backgrounds.
 *
 * @overview-example CircularProgressBarTheming
 * Styling of CircularProgressBar is possible with [configuring a custom theme](guides/branding).
 */

@styled('CircularProgressBar')
export class CircularProgressBar extends React.PureComponent<CircularProgressBarProps> {

  static defaultProps: Partial<CircularProgressBarProps> = {
    animating: true,
    progress: 0,
  };

  private animation = new CircularProgressBarAnimation();

  public componentDidMount(): void {
    if (this.props.animating) {
      this.startAnimation();
    }
  }

  public componentDidUpdate(prevProps: CircularProgressBarProps): void {
    const progressChanged: boolean = this.props.progress !== prevProps.progress;
    const animatingChanged: boolean = this.props.animating !== prevProps.animating;

    if (progressChanged && this.props.animating) {
      this.startAnimation();
    }

    if (animatingChanged && !this.props.animating) {
      this.stopAnimation();
    }
  }

  public componentWillUnmount(): void {
    this.animation.release();
  }

  private startAnimation = (): void => {
    const validProgress = this.clamp(this.props.progress);
    this.animation.startDeterminate(validProgress);
  }

  private stopAnimation = (): void => {
    this.animation.stop();
  }

  private clamp = (progress: number): number => {
    return progress > 1 ? 1 : (progress < 0 ? 0 : progress);
  }

  private getComponentStyle = (source: StyleType, state?: LoadingStates): ComponentStyles => {
    const {
      indicatorColor, // indicatorColor
      trackColor, // trackColor
      trackWidth, // width of track/indicator

      width, // 2 * radius

      textColor, // font styles
      textFontFamily,
      textFontSize,
      textFontWeight,

      iconWidth, // accessory icon
      successIconColor,
      errorIconColor,

      ...containerStyles
    } = source;

    const widthAsNumber = typeof width === 'number' ? width : 80; // default medium width
    const radius = widthAsNumber / 2;
    const elementWidth = trackWidth > radius ? radius : trackWidth;

    const isSuccess = state === 'success';
    const stateColor = isSuccess ? successIconColor : errorIconColor;

    return {
      radius,
      track: {
        width: elementWidth,
        color: trackColor,
      },
      indicator: {
        width: elementWidth,
        color: state ? stateColor : indicatorColor,
      },
      container: {
        width,
        borderRadius: radius,
        ...containerStyles,
      },
      icon: {
        width: iconWidth,
        tintColor: stateColor,
      },
      text: {
        color: textColor,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
      },
    };
  }

  private renderStaticHalf = (radius: number, style: IndicatorStyle): React.ReactElement<ViewProps> => {
    const { width, color } = style;

    return (
      <View
        style={{
          width: radius * 2,
          height: radius,
          overflow: 'hidden',
        }}>
        <View
          style={{
            borderWidth: width,
            borderColor: color,
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
          }}
        />
      </View>
    );
  }

  private renderHalfCircle = (
    style: ComponentStyles, viewStyle: ViewStyle, rotate: NumberProp, opacity?: NumberProp,
  ): React.ReactElement<ViewProps> => {
    const { radius, track, indicator } = style;
    const opacityProp = opacity || opacity === 0 ? { opacity } : undefined;

    return (
      <View style={viewStyle}>
        {this.renderStaticHalf(radius, indicator)}
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            ...opacityProp,
            transform: [
              { translateY: radius / 2 },
              { rotate },
              { translateY: -1 * radius / 2 },
              { perspective: 1000 },
            ],
          }}>
          {this.renderStaticHalf(radius, track)}
        </Animated.View>
      </View>
    );
  }

  private renderCircularProgress = (
    progress: number, animating: boolean, state: LoadingStates | undefined, style: ComponentStyles,
  ): React.ReactElement<ViewProps> => {
    let firstHalfOpacity;
    let firstHalfRotate;
    let secondHalfRotate;

    if (animating) {
      const animationStyles = this.animation.toProps();

      firstHalfOpacity = animationStyles.opacity;
      firstHalfRotate = animationStyles.rotateFirstHalf;
      secondHalfRotate = animationStyles.rotateSecondHalf;
    } else {
      const isSecondHalfActive = progress > 0.5;

      firstHalfOpacity = isSecondHalfActive ? 0 : 1;
      firstHalfRotate = `${progress * 360}deg`;
      secondHalfRotate = isSecondHalfActive ? `${(progress - 0.5) * 360}deg` : '0deg';

    }

    return (
      <View style={[ styles.absoluteFill, styles.center, styles.rotate90 ]}>
        {this.renderHalfCircle(style, styles.zIndex, firstHalfRotate, firstHalfOpacity)}
        {this.renderHalfCircle(style, styles.rotate180, secondHalfRotate)}
      </View>
    );
  }

  private getLabel = (progress: number): string => {
    return `${Math.round(progress * 100)}%`;
  }

  private renderText = (progress: number, style: TextStyle): React.ReactElement<TextProps> => {
    const label = this.getLabel(progress);

    return (
      <Text style={[ style ]}>
        {label}
      </Text>
    );
  }

  private renderIcon = (state: LoadingStates, style: IconStyle): React.ReactElement<IconProps> => {
    const { width, tintColor } = style;
    const isSuccess = state === 'success';
    const src = isSuccess ? 'checkmark' : 'close';

    return (
      <Icon
        name={src}
        style={{
          tintColor,
          width,
          height: width,
        }}/>
    );
  };

  private renderAccessory = (
    progress: number, state: LoadingStates | undefined, style: ComponentStyles,
  ): React.ReactElement<ViewProps> => {
    return (
      <View style={[ styles.absoluteFill, styles.center ]}>
        {
          state
            ? this.renderIcon(state, style.icon)
            : this.renderText(progress, style.text)
        }
      </View>
    );
  }

  public render(): React.ReactElement<ViewProps> {
    const { eva, style, progress, animating, state, ...viewProps } = this.props;
    const validProgress = this.clamp(progress);
    const combinedStyles: StyleType = StyleSheet.flatten([ eva.style, this.props.style ]);
    const computedStyles = this.getComponentStyle(combinedStyles, state);

    return (
      <View
        {...viewProps}
        style={computedStyles.container}>
        {this.renderCircularProgress(validProgress, animating, state, computedStyles)}
        {this.renderAccessory(validProgress, state, computedStyles)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  zIndex: {
    zIndex: 1,
  },

  rotate90: {
    transform: [
      { rotate: '90deg' },
    ],
  },

  rotate180: {
    transform: [
      { rotate: '180deg' },
    ],
  },
});


