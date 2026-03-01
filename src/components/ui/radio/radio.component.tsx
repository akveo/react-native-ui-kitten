/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useRef, useEffect } from 'react';
import {
  Animated,
  GestureResponderEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TargetedEvent,
  View,
} from 'react-native';
import {
  EvaStatus,
  FalsyText,
  RenderProp,
  TouchableWeb,
  TouchableWebElement,
  TouchableWebProps,
  LiteralUnion,
} from '../../devsupport';
import {
  Interaction,
  useStyled,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';

type TouchableWebPropsWithoutChildren = Omit<TouchableWebProps, 'children'>;

export interface RadioProps extends TouchableWebPropsWithoutChildren {
  children?: RenderProp<TextProps> | React.ReactText;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  status?: EvaStatus;
  appearance?: LiteralUnion<'default'>;
}

export type RadioElement = React.ReactElement<RadioProps>;

/**
 * Radio buttons allow the user to select one option from a set.
 */
export const Radio: React.FC<RadioProps> = (props): TouchableWebElement => {
  const {
    appearance,
    status,
    checked,
    disabled,
    style,
    children,
    onChange,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    onPressIn: onPressInProp,
    onPressOut: onPressOutProp,
    ...touchableProps
  } = props;

  const { style: evaStyle, dispatch } = useStyled('Radio', {
    appearance,
    status,
    checked,
    disabled,
  });

  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const innerScaleAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const prevCheckedRef = useRef(checked);

  // Animate inner circle when checked changes
  useEffect(() => {
    if (prevCheckedRef.current !== checked) {
      prevCheckedRef.current = checked;
      Animated.spring(innerScaleAnim, {
        toValue: checked ? 1 : 0,
        useNativeDriver: true,
        friction: 6,
        tension: 80,
      }).start();
    }
  }, [checked, innerScaleAnim]);

  // Compute component style
  const {
    textMarginHorizontal,
    textFontFamily,
    textFontSize,
    textFontWeight,
    textColor,
    iconWidth,
    iconHeight,
    iconBorderRadius,
    iconTintColor,
    outlineWidth,
    outlineHeight,
    outlineBorderRadius,
    outlineBackgroundColor,
    ...containerParameters
  } = evaStyle as StyleType;

  const componentStyle = {
    selectContainer: containerParameters,
    text: {
      marginHorizontal: textMarginHorizontal,
      fontFamily: textFontFamily,
      fontSize: textFontSize,
      fontWeight: textFontWeight,
      color: textColor,
    },
    icon: {
      width: iconWidth,
      height: iconHeight,
      borderRadius: iconBorderRadius,
      backgroundColor: iconTintColor,
    },
    highlight: {
      width: outlineWidth,
      height: outlineHeight,
      borderRadius: outlineBorderRadius,
      backgroundColor: outlineBackgroundColor,
    },
  };

  // Event handlers
  const onMouseEnter = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    dispatch([Interaction.HOVER]);
    onMouseEnterProp?.(event);
  };

  const onMouseLeave = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    dispatch([]);
    onMouseLeaveProp?.(event);
  };

  const onFocus = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    dispatch([Interaction.FOCUSED]);
    onFocusProp?.(event);
  };

  const onBlur = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    dispatch([]);
    onBlurProp?.(event);
  };

  const onPress = (): void => {
    onChange?.(!checked);
  };

  const onPressIn = (event: GestureResponderEvent): void => {
    dispatch([Interaction.ACTIVE]);
    onPressInProp?.(event);
    // Bouncy scale down
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      friction: 8,
      tension: 100,
    }).start();
  };

  const onPressOut = (event: GestureResponderEvent): void => {
    dispatch([]);
    onPressOutProp?.(event);
    // Bouncy scale back
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
      tension: 80,
    }).start();
  };

  return (
    <TouchableWeb
      {...touchableProps}
      style={[styles.container, style]}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          styles.highlightContainer,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        <View style={[componentStyle.highlight, styles.highlight]} />
        <View style={[componentStyle.selectContainer, styles.selectContainer]}>
          <Animated.View
            style={[
              componentStyle.icon,
              {
                transform: [{ scale: innerScaleAnim }],
                opacity: innerScaleAnim,
              },
            ]}
          />
        </View>
      </Animated.View>
      <FalsyText
        style={componentStyle.text}
        component={children}
      />
    </TouchableWeb>
  );
};

Radio.displayName = 'Radio';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    position: 'absolute',
  },
});
