/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import { LiteralUnion } from '../../devsupport';
import { useStyled } from '../../theme';

export interface LayoutProps extends ViewProps {
  children?: React.ReactNode;
  /**
   * Appearance of the component.
   * Defaults to *default*.
   */
  appearance?: LiteralUnion<'default'>;
  /**
   * Background color level of component.
   * Can be `1`, `2`, `3` or `4`.
   * Defaults to *1*.
   */
  level?: LiteralUnion<'1' | '2' | '3' | '4'>;
}

export type LayoutElement = React.ReactElement<LayoutProps>;

/**
 * Overall page container.
 *
 * @extends React.FC
 *
 * @property {ReactNode} children - Component to render within the layout.
 *
 * @property {string} level - Background color level of component.
 * Can be `1`, `2`, `3` or `4`.
 * Defaults to *1*.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example LayoutLevel
 * Layout should be used as a root component of the screen.
 * Comparative to `View` element, it uses a background color with respect to current theme.
 * Using Layout is redundant, when background color is configured with `style` property.
 *
 * Layouts can be used in different levels.
 * It is useful, when needed to highlight the container relative to another.
 */
export const Layout = React.forwardRef<View, LayoutProps>(
  (props, ref) => {
    const {
      appearance,
      level,
      style,
      children,
      ...viewProps
    } = props;

    // Use the new hook instead of @styled decorator
    const { style: evaStyle } = useStyled('Layout', {
      appearance,
      level,
    });

    return (
      <View
        ref={ref}
        {...viewProps}
        style={[evaStyle, style]}
      >
        {children}
      </View>
    );
  },
);

Layout.displayName = 'Layout';
