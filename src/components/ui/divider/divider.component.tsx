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

export interface DividerProps extends ViewProps {
  /**
   * Appearance of the component.
   * Defaults to *default*.
   */
  appearance?: LiteralUnion<'default'>;
}

export type DividerElement = React.ReactElement<DividerProps>;

/**
 * A divider is a thin line that groups content in lists and layouts.
 *
 * @extends React.FC
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example DividerSimpleUsage
 */
export const Divider = React.forwardRef<View, DividerProps>(
  (props, ref) => {
    const {
      appearance,
      style,
      ...viewProps
    } = props;

    const { style: evaStyle } = useStyled('Divider', {
      appearance,
    });

    return (
      <View
        ref={ref}
        {...viewProps}
        style={[evaStyle, style]}
      />
    );
  },
);

Divider.displayName = 'Divider';
