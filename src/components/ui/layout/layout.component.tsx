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
} from '@kitten/theme';

export interface LayoutProps extends StyledComponentProps, ViewProps {
  level?: string;
  children?: React.ReactNode;
}

export type LayoutElement = React.ReactElement<LayoutProps>;

/**
 * `Layout` container component. Behaves like React Native `View`.
 * The key feature of using `Layout` instead of `View` is that
 * it automatically picks background color fitting to current theme.
 *
 * @extends React.Component
 *
 * @property {string} level - Determines background color level of component.
 * Can be `'1'`, `'2'`, `'3'` or `'4'`.
 * Default is `'1'`.
 *
 * @property {ReactElement | ReactElement[]} children - Determines the children of the component.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example LayoutSimpleUsage
 *
 * @overview-example LayoutLevel
 *
 * @example LayoutInlineStyling
 */
export class LayoutComponent extends React.Component<LayoutProps> {

  static styledComponentName: string = 'Layout';

  public render(): React.ReactElement<ViewProps> {
    const { style, themedStyle, ...derivedProps } = this.props;

    return (
      <View
        {...derivedProps}
        style={[themedStyle, style]}
      />
    );
  }
}

export const Layout = styled<LayoutProps>(LayoutComponent);
