/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  EvaSize,
  EvaStatus,
  LiteralUnion,
} from '../../devsupport';
import {
  useStyled,
  StyleType,
} from '../../theme';
import { ProgressBarAnimation, ProgressBarAnimationConfig } from './animation';

interface ComponentStyles {
  track: ViewStyle;
  indicator: ViewStyle;
}

export interface ProgressBarProps extends ViewProps {
  progress?: number;
  animating?: boolean;
  animationConfig?: Partial<ProgressBarAnimationConfig>;
  status?: EvaStatus;
  size?: EvaSize;
  appearance?: LiteralUnion<'default'>;
}

export type ProgressBarElement = React.ReactElement<ProgressBarProps>;

const getComponentStyle = (source: StyleType): ComponentStyles => {
  const {
    height,
    borderRadius,
    trackColor,
    indicatorColor,
  } = source;

  return {
    track: {
      height,
      borderRadius,
      backgroundColor: trackColor,
    },
    indicator: {
      height,
      borderRadius,
      backgroundColor: indicatorColor,
    },
  };
};

const clamp = (progress: number): number => {
  return progress > 1 ? 1 : (progress < 0 ? 0 : progress);
};

/**
 * Displays the length of a process.
 *
 * @extends React.FC
 *
 * @property {boolean} animating - Whether component is animating.
 * Default is *true*.
 *
 * @property {number} progress - Current state of a process.
 * Can be from 0 to 1.
 *
 * @property {string} size - Size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Defaults to *small*.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *primary*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {Partial<ProgressBarAnimationConfig>} animationConfig - Animation configuration.
 * Optional. Can define duration, easing function and etc.
 *
 * @overview-example ProgressBarSimpleUsage
 * Default ProgressBar animating is `true`.
 *
 * @overview-example ProgressBarTheming
 * Styling of ProgressBar is possible with [configuring a custom theme](guides/branding).
 *
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  style,
  progress = 0,
  animating = true,
  animationConfig,
  status,
  size,
  appearance,
  onLayout: onLayoutProp,
  ...viewProps
}) => {
  const { style: evaStyleRaw } = useStyled('ProgressBar', { appearance, status, size });
  const animationRef = useRef<ProgressBarAnimation>(new ProgressBarAnimation(animationConfig));

  const combinedStyles: StyleType = useMemo(
    () => StyleSheet.flatten([evaStyleRaw, style]),
    [evaStyleRaw, style]
  );
  const evaStyle = useMemo(() => getComponentStyle(combinedStyles), [combinedStyles]);

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

  const onLayout = useCallback((event: LayoutChangeEvent): void => {
    onLayoutProp?.(event);
    const trackWidth = event.nativeEvent.layout.width;
    animationRef.current.setBarWidth(trackWidth);
  }, [onLayoutProp]);

  const renderIndicator = (): React.ReactElement<Animated.AnimatedProps<ViewStyle>> => {
    const indicatorStyles: Animated.AnimatedProps<ViewStyle>[] = [evaStyle.indicator];

    if (animating) {
      const animationStyles = animationRef.current.toProps();
      indicatorStyles.push(animationStyles);
    } else {
      const validProgress = clamp(progress);
      const width = `${validProgress * 100}%` as `${number}%`;
      indicatorStyles.push({ width });
    }

    return (
      <Animated.View style={indicatorStyles} />
    );
  };

  return (
    <View
      {...viewProps}
      style={[evaStyle.track, styles.noOverflow, style]}
      onLayout={onLayout}
    >
      {renderIndicator()}
    </View>
  );
};

ProgressBar.displayName = 'ProgressBar';

const styles = StyleSheet.create({
  noOverflow: {
    overflow: 'hidden',
  },
});


