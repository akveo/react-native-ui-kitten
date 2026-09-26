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
 * Press surface used by every interactive component.
 *
 * Renders a `Pressable`: UI Kitten paints its own press, hover and focus states through Eva
 * styles, so the opacity animation `TouchableOpacity` sets up on every render was pure overhead.
 * Keeps the `TouchableOpacityProps` public surface; `onMouseEnter` / `onMouseLeave` are forwarded
 * as Pressable's hover events and `activeOpacity` is ignored.
 */
export class TouchableWithoutFeedback extends React.Component<TouchableWithoutFeedbackProps> {

  private createHitSlopInsets = (): Insets => {
    const flatStyle: ViewStyle = StyleSheet.flatten(this.props.style || {});

    // @ts-ignore: `width` is restricted to be a number
    const value: number = 40 - flatStyle.height || 0;

    return {
      left: value,
      top: value,
      right: value,
      bottom: value,
    };
  };

  public render(): React.ReactElement {
    const {
      useDefaultHitSlop,
      hitSlop,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      activeOpacity,
      role,
      accessibilityRole,
      onMouseEnter,
      onMouseLeave,
      ...pressableProps
    } = this.props as TouchableWithoutFeedbackProps & {
      onMouseEnter?: (event: unknown) => void;
      onMouseLeave?: (event: unknown) => void;
    };

    return (
      <Pressable
        hitSlop={hitSlop ?? (useDefaultHitSlop ? this.createHitSlopInsets() : undefined)}
        {...pressableProps}
        // `TouchableOpacity` forwarded only `accessibilityRole` to the native view; keep that
        // behaviour so native announcements do not change. On web `role` carries the exact ARIA value.
        role={Platform.OS === 'web' || !accessibilityRole ? role : undefined}
        accessibilityRole={accessibilityRole}
        onHoverIn={onMouseEnter}
        onHoverOut={onMouseLeave}
      />
    );
  }
}

export type TouchableWithoutFeedbackRef = View;
