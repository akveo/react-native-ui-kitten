/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useMemo, forwardRef } from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { StyleType } from '../../theme';

export type PopoverIndicatorProps = ViewProps;
export type PopoverIndicatorElement = React.ReactElement<PopoverIndicatorProps>;

/**
 * Triangle indicator component for Popover.
 * Creates a triangle shape using CSS borders.
 */
export const PopoverIndicator = forwardRef<View, PopoverIndicatorProps>(({
  style,
  ...props
}, ref) => {
  const componentStyle = useMemo((): StyleType => {
    const flatStyle: ViewStyle = StyleSheet.flatten(style) || {};

    return {
      container: {
        // @ts-ignore: `width` is restricted to be a number
        borderLeftWidth: flatStyle.width,
        // @ts-ignore: `width` is restricted to be a number
        borderRightWidth: flatStyle.width,
        // @ts-ignore: `height` is restricted to be a number
        borderBottomWidth: flatStyle.height,
        borderBottomColor: flatStyle.backgroundColor,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        backgroundColor: 'transparent',
      },
    };
  }, [style]);

  return (
    <View
      ref={ref}
      {...props}
      style={[style, componentStyle.container]}
    />
  );
});

// Display name for debugging
PopoverIndicator.displayName = 'PopoverIndicator';
