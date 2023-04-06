/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Animated,
  StyleSheet,
  TextProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  EvaSize,
  LiteralUnion,
  Overwrite,
  Size,
  EvaStatus,
  RenderProp,
  FalsyFC,
} from '@ui-kitten/components/devsupport';
import {
  IconProps,
  styled,
  StyledComponentProps,
  StyleType,
  Text,
} from '@ui-kitten/components';
import { CircularProgressBarAnimation, CircularProgressBarAnimationConfig } from './animation';

type CircularProgressBarStyledProps = Overwrite<StyledComponentProps, {
  appearance?: LiteralUnion<'default'>;
}>;

interface IndicatorStyle {
  width: number;
  color: string;
}

interface IconStyle {
  width: number;
  height: number;
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

type LoadingStates = LiteralUnion<'success' | 'error' | 'progress'>;

export interface CircularProgressBarProps extends ViewProps, CircularProgressBarStyledProps {
  progress?: number;
  animating?: boolean;
  renderIcon?: RenderProp<Partial<IconProps>>;
  size?: EvaSize;
  status?: EvaStatus;
  textStyle?: TextStyle;
  iconStyle?: IconStyle;
  animationConfig?: Partial<CircularProgressBarAnimationConfig>;
}

export type CircularProgressBarElement = React.ReactElement<CircularProgressBarProps>;

/**
 * Displays the length of a process.
 *
 * @extends React.Component
 *
 * @property {number} progress - Current progress value of the process.
 * Can be from 0 to 1.

 * @property {boolean} animating - Whether component is animating.
 * Default is *true*.
 *
 * @property {string} size - Size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Defaults to *medium*.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *primary*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {ReactElement | (IconProps) => ReactElement} renderIcon - Function component
 * to render inside circular progress bar.
 * Expected to return an Icon.
 *
 * @property {Partial<CircularProgressBarAnimationConfig>} animationConfig - Animation configuration.
 * Optional. Can define duration, easing function and etc.
 *
 * @overview-example CircularProgressBarSimpleUsage
 * Default CircularProgressBar status is `primary`, size is `medium` and animating is `true`.
 *
 * @overview-example CircularProgressBarSizes
 * To resize CircularProgressBar, a `size` property may be used.
 *
 * @overview-example CircularProgressBarStates
 * To show the specific status of the process, a `status` property may be used.
 *
 * @overview-example CircularProgressBarTheming
 * Styling of CircularProgressBar is possible with [configuring a custom theme](guides/branding).
 *
 */

@styled('CircularProgressBar')
export class CircularProgressBar extends React.PureComponent<CircularProgressBarProps> {

  static defaultProps: Partial<CircularProgressBarProps> = {
    animating: true,
    progress: 0,
  };

  private animation: CircularProgressBarAnimation;

  constructor(props: CircularProgressBarProps) {
    super(props);

    this.animation = new CircularProgressBarAnimation(props.animationConfig);
  }

  private get containerSize(): Size {
    const { width, height } = StyleSheet.flatten([this.props.eva.style, this.props.style]);
    // @ts-ignore: width and height are restricted to be a number
    return new Size(width, height);
  }

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
  };

  private stopAnimation = (): void => {
    this.animation.stop();
  };

  private clamp = (progress: number): number => {
    return progress > 1 ? 1 : (progress < 0 ? 0 : progress);
  };

  private getComponentStyle = (source: StyleType): ComponentStyles => {
    const {
      trackWidth, // width of track/indicator
      trackColor,
      indicatorColor,

      iconWidth, // accessory icon

      textFontFamily,
      textFontSize,
      textFontWeight,
    } = source;

    const { width, height }: Size = this.containerSize;

    const radius = width / 2;
    const elementWidth = trackWidth > radius ? radius : trackWidth;

    return {
      radius,
      track: {
        width: elementWidth,
        color: trackColor,
      },
      indicator: {
        width: elementWidth,
        color: indicatorColor,
      },
      container: {
        width,
        height,
        borderRadius: radius,
      },
      icon: {
        width: iconWidth,
        height: iconWidth,
        tintColor: indicatorColor,
      },
      text: {
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
      },
    };
  };

  private renderHalfCircle = (radius: number, style: IndicatorStyle): React.ReactElement<ViewProps> => {
    const { width, color } = style;
    const containerSizeStyle = {
      width: radius * 2,
      height: radius,
    };

    return (
      <View style={[styles.circle, containerSizeStyle]}>
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
  };

  private renderHalf = (
    evaStyle: ComponentStyles,
    viewStyle: ViewStyle,
    rotate: string,
    opacity?: number,
  ): React.ReactElement<ViewProps> => {
    const { radius, indicator } = evaStyle;
    const opacityProp = opacity || opacity === 0 ? { opacity } : undefined;

    return (
      <View style={viewStyle}>
        <View style={{ width: radius * 2, height: radius }} />
        <Animated.View style={{
          ...styles.absoluteFill,
          ...opacityProp,
          transform: [
            { translateY: radius / 2 },
            { rotate },
            { translateY: -1 * radius / 2 },
            { perspective: 1000 },
          ],
        }}
        >
          {this.renderHalfCircle(radius, indicator)}
        </Animated.View>
      </View>
    );
  };

  private renderCircularProgress = (
    progress: number,
    animating: boolean,
    evaStyle: ComponentStyles
  ): React.ReactElement<ViewProps> => {
    let firstHalfRotate;
    let secondHalfRotate;

    if (animating) {
      const { rotateFirstHalf, rotateSecondHalf } = this.animation.toProps();

      firstHalfRotate = rotateFirstHalf;
      secondHalfRotate = rotateSecondHalf;
    } else {
      firstHalfRotate = `${Math.min(progress, 0.5) * 360 - 180}deg`;
      secondHalfRotate = `${Math.max(0.5, progress) * 360}deg`;
    }

    const trackStyle = {
      ...StyleSheet.absoluteFillObject,
      borderWidth: evaStyle.track.width,
      borderColor: evaStyle.track.color,
      borderRadius: evaStyle.radius,
    };

    return (
      <View style={[styles.absoluteFill, styles.center, styles.rotate90]}>
        <View style={trackStyle} />
        {this.renderHalf(evaStyle, styles.zIndex, firstHalfRotate)}
        {this.renderHalf(evaStyle, styles.rotate180, secondHalfRotate)}
      </View>
    );
  };

  private renderText = (progress: number, style: TextStyle): React.ReactElement<TextProps> => {
    const label = `${Math.round(progress * 100)}%`;
    const { status, textStyle } = this.props;

    return (
      <Text
        style={[style, textStyle]}
        status={status}
      >
        {label}
      </Text>
    );
  };

  private renderIcon = (state: LoadingStates, style: IconStyle): React.ReactElement<IconProps> => {
    return (
      <FalsyFC
        component={this.props.renderIcon}
        style={[style, this.props.iconStyle]}
      />
    );
  };

  private renderAccessory = (
    progress: number,
    status: EvaStatus,
    evaStyle: ComponentStyles
  ): React.ReactElement<ViewProps> => {
    const showIcon = this.props.renderIcon;

    return (
      <View style={[styles.absoluteFill, styles.center]}>
        {showIcon ? this.renderIcon(status, evaStyle.icon) : this.renderText(progress, evaStyle.text)}
      </View>
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const {
      eva,
      style,
      progress,
      animating,
      status,
      size,
      textStyle,
      ...viewProps
    } = this.props;
    const validProgress = this.clamp(progress);
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <View
        {...viewProps}
        style={[evaStyle.container, style]}
      >
        {this.renderCircularProgress(validProgress, animating, evaStyle)}
        {this.renderAccessory(validProgress, status, evaStyle)}
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
    overflow: 'hidden',
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
    overflow: 'hidden',
  },
  circle: {
    overflow: 'hidden',
  },
});


