/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
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
  Size,
  EvaStatus,
  RenderProp,
  FalsyFC,
} from '@ui-kitten/components/devsupport';
import {
  IconProps,
  useStyled,
  StyleType,
  Text,
} from '@ui-kitten/components';
import { CircularProgressBarAnimation, CircularProgressBarAnimationConfig } from './animation';

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

export interface CircularProgressBarProps extends ViewProps {
  progress?: number;
  animating?: boolean;
  renderIcon?: RenderProp<Partial<IconProps>>;
  size?: EvaSize;
  status?: EvaStatus;
  textStyle?: TextStyle;
  iconStyle?: IconStyle;
  animationConfig?: Partial<CircularProgressBarAnimationConfig>;
  appearance?: LiteralUnion<'default'>;
}

export type CircularProgressBarElement = React.ReactElement<CircularProgressBarProps>;

const clamp = (progress: number): number => {
  return progress > 1 ? 1 : (progress < 0 ? 0 : progress);
};

/**
 * Displays the length of a process.
 *
 * @extends React.FC
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
export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  style,
  progress = 0,
  animating = true,
  renderIcon,
  size,
  status,
  textStyle,
  iconStyle,
  animationConfig,
  appearance,
  ...viewProps
}) => {
  const { style: evaStyleRaw } = useStyled('CircularProgressBar', { appearance, status, size });
  const animationRef = useRef<CircularProgressBarAnimation>(new CircularProgressBarAnimation(animationConfig));

  const containerSize = useMemo((): Size => {
    const { width, height } = StyleSheet.flatten([evaStyleRaw, style]);
    // @ts-ignore: width and height are restricted to be a number
    return new Size(width, height);
  }, [evaStyleRaw, style]);

  const getComponentStyle = useCallback((source: StyleType): ComponentStyles => {
    const {
      trackWidth,
      trackColor,
      indicatorColor,
      iconWidth,
      textFontFamily,
      textFontSize,
      textFontWeight,
    } = source;

    const { width, height } = containerSize;
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
  }, [containerSize]);

  const evaStyle = useMemo(() => getComponentStyle(evaStyleRaw), [evaStyleRaw, getComponentStyle]);

  const startAnimation = useCallback(() => {
    const validProgress = clamp(progress);
    animationRef.current.startDeterminate(validProgress);
  }, [progress]);

  const stopAnimation = useCallback(() => {
    animationRef.current.stop();
  }, []);

  useEffect(() => {
    if (animating) {
      startAnimation();
    }
  }, [animating, startAnimation]);

  useEffect(() => {
    if (!animating) {
      stopAnimation();
    }
  }, [animating, stopAnimation]);

  useEffect(() => {
    return () => {
      animationRef.current.release();
    };
  }, []);

  const validProgress = clamp(progress);

  const renderHalfCircle = (radius: number, indicatorStyle: IndicatorStyle): React.ReactElement<ViewProps> => {
    const { width, color } = indicatorStyle;
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

  const renderHalf = (
    componentStyle: ComponentStyles,
    viewStyle: ViewStyle,
    rotate: string,
    opacity?: number,
  ): React.ReactElement<ViewProps> => {
    const { radius, indicator } = componentStyle;
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
          {renderHalfCircle(radius, indicator)}
        </Animated.View>
      </View>
    );
  };

  const renderCircularProgress = (
    prog: number,
    isAnimating: boolean,
    componentStyle: ComponentStyles
  ): React.ReactElement<ViewProps> => {
    let firstHalfRotate;
    let secondHalfRotate;

    if (isAnimating) {
      const { rotateFirstHalf, rotateSecondHalf } = animationRef.current.toProps();
      firstHalfRotate = rotateFirstHalf;
      secondHalfRotate = rotateSecondHalf;
    } else {
      firstHalfRotate = `${Math.min(prog, 0.5) * 360 - 180}deg`;
      secondHalfRotate = `${Math.max(0.5, prog) * 360}deg`;
    }

    const trackStyle = {
      ...StyleSheet.absoluteFillObject,
      borderWidth: componentStyle.track.width,
      borderColor: componentStyle.track.color,
      borderRadius: componentStyle.radius,
    };

    return (
      <View style={[styles.absoluteFill, styles.center, styles.rotate90]}>
        <View style={trackStyle} />
        {renderHalf(componentStyle, styles.zIndex, firstHalfRotate)}
        {renderHalf(componentStyle, styles.rotate180, secondHalfRotate)}
      </View>
    );
  };

  const renderText = (prog: number, textStyleProp: TextStyle): React.ReactElement<TextProps> => {
    const label = `${Math.round(prog * 100)}%`;

    return (
      <Text
        style={[textStyleProp, textStyle]}
        status={status}
      >
        {label}
      </Text>
    );
  };

  const renderIconElement = (state: LoadingStates, iconStyleProp: IconStyle): React.ReactElement<IconProps> => {
    return (
      <FalsyFC
        component={renderIcon}
        style={[iconStyleProp, iconStyle]}
      />
    );
  };

  const renderAccessory = (
    prog: number,
    componentStatus: EvaStatus,
    componentStyle: ComponentStyles
  ): React.ReactElement<ViewProps> => {
    const showIcon = renderIcon;

    return (
      <View style={[styles.absoluteFill, styles.center]}>
        {showIcon ? renderIconElement(componentStatus, componentStyle.icon) : renderText(prog, componentStyle.text)}
      </View>
    );
  };

  return (
    <View
      {...viewProps}
      style={[evaStyle.container, style]}
    >
      {renderCircularProgress(validProgress, animating, evaStyle)}
      {renderAccessory(validProgress, status, evaStyle)}
    </View>
  );
};

CircularProgressBar.displayName = 'CircularProgressBar';

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


