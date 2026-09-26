/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Insets,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

export interface TouchableWithoutFeedbackProps extends TouchableOpacityProps {
  useDefaultHitSlop?: boolean;
  children?: React.ReactNode;
  focusable?: boolean;
}

export type TouchableWithoutFeedbackElement = React.ReactElement<TouchableWithoutFeedbackProps>;

/**
 * Renders the `Pressable` every interactive component presses through.
 *
 * UI Kitten paints its own press, hover and focus states through Eva styles, so the opacity
 * animation `TouchableOpacity` set up on every render was pure overhead. Keeps the
 * `TouchableOpacityProps` public surface: `onMouseEnter` / `onMouseLeave` are forwarded as
 * Pressable's hover events, `activeOpacity` is ignored, and only `accessibilityRole` reaches the
 * native view (as `TouchableOpacity` did) so native announcements do not change; on web `role`
 * carries the exact ARIA value.
 */
export const renderPressable = (
  props: TouchableWithoutFeedbackProps,
  extraStyle?: StyleProp<ViewStyle>,
): React.ReactElement => {
  const {
    useDefaultHitSlop,
    hitSlop,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    activeOpacity,
    role,
    accessibilityRole,
    onMouseEnter,
    onMouseLeave,
    style,
    ...pressableProps
  } = props as TouchableWithoutFeedbackProps & {
    onMouseEnter?: (event: unknown) => void;
    onMouseLeave?: (event: unknown) => void;
  };

  return (
    <Pressable
      hitSlop={hitSlop ?? (useDefaultHitSlop ? createHitSlopInsets(style) : undefined)}
      {...pressableProps}
      style={extraStyle ? [extraStyle, style] : style}
      role={Platform.OS === 'web' || !accessibilityRole ? role : undefined}
      accessibilityRole={accessibilityRole}
      onHoverIn={onMouseEnter}
      onHoverOut={onMouseLeave}
    />
  );
};

const createHitSlopInsets = (style: StyleProp<ViewStyle>): Insets => {
  const flatStyle: ViewStyle = StyleSheet.flatten(style || {});

  // @ts-ignore: `width` is restricted to be a number
  const value: number = 40 - flatStyle.height || 0;

  return {
    left: value,
    top: value,
    right: value,
    bottom: value,
  };
};

/**
 * Press surface used by every interactive component (see `renderPressable`).
 */
export class TouchableWithoutFeedback extends React.Component<TouchableWithoutFeedbackProps> {

  public render(): React.ReactElement {
    return renderPressable(this.props);
  }
}

export type TouchableWithoutFeedbackRef = View;
