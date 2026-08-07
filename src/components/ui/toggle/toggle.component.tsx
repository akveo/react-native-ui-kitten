/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useRef, useEffect, useMemo } from 'react';
import {
  Animated,
  Easing,
  NativeSyntheticEvent,
  StyleSheet,
  TargetedEvent,
  View,
  ViewProps,
} from 'react-native';
import {
  EvaStatus,
  FalsyText,
  RenderProp,
  RTLService,
  TouchableWeb,
  TouchableWebProps,
  LiteralUnion,
} from '../../devsupport';
import {
  Interaction,
  useStyled,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';
import { CheckMark } from '../shared/checkmark.component';

type TouchableWebPropsWithoutChildren = Omit<TouchableWebProps, 'children'>;

export interface ToggleProps extends TouchableWebPropsWithoutChildren {
  children?: RenderProp<TextProps> | string | number;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  status?: EvaStatus;
  appearance?: LiteralUnion<'default'>;
}

export type ToggleElement = React.ReactElement<ToggleProps>;

const ANIMATION_DURATION = 200;

/**
 * Switches toggle the state of a single setting on or off.
 */
export const Toggle: React.FC<ToggleProps> = (props): React.ReactElement<ViewProps> => {
  const {
    appearance,
    status,
    checked = false,
    disabled,
    style,
    children,
    onChange,
    testID,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    ...touchableProps
  } = props;

  const { style: evaStyle, dispatch } = useStyled('Toggle', {
    appearance,
    status,
    checked,
    disabled,
  });

  // Calculate dimensions from Eva style
  const containerWidth = (evaStyle.width as number) || 52;
  const containerHeight = (evaStyle.height as number) || 32;
  const borderWidth = (evaStyle.borderWidth as number) || 1;
  const thumbWidth = (evaStyle.thumbWidth as number) || 24;
  const thumbHeight = (evaStyle.thumbHeight as number) || 24;

  // Calculate max translation distance (how far the thumb needs to move)
  const maxTranslate = containerWidth - thumbWidth - (borderWidth * 2);

  // Animation values - single translateX controls everything
  const translateX = useRef(new Animated.Value(checked ? maxTranslate : 0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const ellipseScaleAnim = useRef(new Animated.Value(checked ? 0.01 : 1)).current;

  // Track previous checked value to detect external changes
  const prevCheckedRef = useRef(checked);

  // Animate when checked prop changes
  useEffect(() => {
    if (prevCheckedRef.current !== checked) {
      prevCheckedRef.current = checked;
      const toValue = checked ? maxTranslate : 0;

      Animated.parallel([
        Animated.timing(translateX, {
          toValue: RTLService.select(toValue, -toValue + maxTranslate),
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(ellipseScaleAnim, {
          toValue: checked ? 0.01 : 1,
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [checked, maxTranslate, translateX, ellipseScaleAnim]);

  // Handle press
  const handlePress = (): void => {
    if (disabled) return;
    onChange?.(!checked);
  };

  // Handle press in (scale up thumb)
  const handlePressIn = (): void => {
    if (disabled) return;
    dispatch([Interaction.ACTIVE]);
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  // Handle press out (scale back)
  const handlePressOut = (): void => {
    if (disabled) return;
    dispatch([]);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  // Event handlers for web hover/focus
  const onMouseEnter = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    if (disabled) return;
    dispatch([Interaction.HOVER]);
    onMouseEnterProp?.(event);
  };

  const onMouseLeave = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    if (disabled) return;
    dispatch([]);
    onMouseLeaveProp?.(event);
  };

  const onFocus = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    if (disabled) return;
    dispatch([Interaction.FOCUSED]);
    onFocusProp?.(event);
  };

  const onBlur = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    if (disabled) return;
    dispatch([]);
    onBlurProp?.(event);
  };

  // Compute component style from Eva
  const componentStyle = useMemo(() => {
    const {
      outlineWidth,
      outlineHeight,
      outlineBorderRadius,
      outlineBackgroundColor,
      thumbBorderRadius,
      thumbBackgroundColor,
      textMarginHorizontal,
      textFontSize,
      textFontWeight,
      textFontFamily,
      textColor,
      iconWidth,
      iconHeight,
      iconTintColor,
      backgroundColor,
      borderColor,
    } = evaStyle as StyleType;

    return {
      container: {
        width: containerWidth,
        height: containerHeight,
        borderRadius: containerHeight / 2,
        borderWidth: borderWidth,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      },
      highlight: {
        width: outlineWidth,
        height: outlineHeight,
        borderRadius: outlineBorderRadius,
        backgroundColor: outlineBackgroundColor,
      },
      ellipse: {
        width: containerWidth - (borderWidth * 2),
        height: containerHeight - (borderWidth * 2),
        borderRadius: (containerHeight - (borderWidth * 2)) / 2,
        backgroundColor: backgroundColor,
      },
      thumb: {
        width: thumbWidth,
        height: thumbHeight,
        borderRadius: thumbBorderRadius,
        backgroundColor: thumbBackgroundColor,
        elevation: disabled ? 0 : 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      text: {
        marginHorizontal: textMarginHorizontal,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        fontFamily: textFontFamily,
        color: textColor,
      },
      icon: {
        width: iconWidth as number,
        height: iconHeight as number,
        fill: iconTintColor,
        stroke: iconTintColor,
        strokeWidth: 3,
      },
    };
  }, [evaStyle, containerWidth, containerHeight, borderWidth, thumbWidth, thumbHeight, disabled]);

  return (
    <View testID={testID} style={[styles.container, style]}>
      <TouchableWeb
        {...touchableProps}
        style={styles.toggleContainer}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
      >
          {/* Highlight / Outline */}
          <View style={[componentStyle.highlight, styles.highlight]} />

          {/* Track / Container */}
          <View style={[componentStyle.container, styles.track]}>
            {/* Ellipse background (scales for visual effect) */}
            <Animated.View
              style={[
                componentStyle.ellipse,
                styles.ellipse,
                { transform: [{ scale: ellipseScaleAnim }] },
              ]}
            />

            {/* Thumb */}
            <Animated.View
              style={[
                componentStyle.thumb,
                styles.thumb,
                {
                  transform: [
                    { translateX: translateX },
                    { scale: scaleAnim },
                  ],
                },
              ]}
            >
              <CheckMark {...componentStyle.icon} />
            </Animated.View>
          </View>
      </TouchableWeb>

      <FalsyText style={componentStyle.text} component={children} />
    </View>
  );
};

Toggle.displayName = 'Toggle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    justifyContent: 'center',
    overflow: 'hidden',
  },
  ellipse: {
    position: 'absolute',
    alignSelf: 'center',
  },
  highlight: {
    position: 'absolute',
  },
  thumb: {
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
