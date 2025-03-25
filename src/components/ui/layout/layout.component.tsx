/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
} from '../../theme';
import { LayoutAppearance, LayoutLevel } from '@eva-design/eva/mapping.types';

interface LayoutStyledProps extends StyledComponentProps {
  appearance?: LayoutAppearance;
}

export interface LayoutProps extends ViewProps, LayoutStyledProps {
  children?: React.ReactNode;
  level?: LayoutLevel;
}

export type LayoutElement = React.ReactElement<LayoutProps>;

/**
 * Overall page container.
 *
 * @extends React.Component
 *
 * @property {ReactNode} children - Component to render within the layout.
 *
 * @property {string} level - Background color level of component.
 * The predefined ones are `1`, `2`, `3` or `4`.
 * Can be extended with custom mapping feature. Defaults to *1*.
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
@styled('Layout')
export class Layout extends React.Component<LayoutProps> {

  public render(): React.ReactElement<ViewProps> {
    const { eva, style, ...viewProps } = this.props;

    return (
      <View
        {...viewProps}
        style={[eva.style, style]}
      />
    );
  }
}
