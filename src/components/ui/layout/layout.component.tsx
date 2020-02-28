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
import { Overwrite } from 'utility-types';
import {
  styled,
  StyledComponentProps,
} from '../../theme';

type LayoutStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | string;
}>;

export interface LayoutProps extends ViewProps, LayoutStyledProps {
  children?: React.ReactNode;
  level?: '1' | '2' | '3' | '4' | string;
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
    const { eva, style, ...viewProps } = this.props;

    return (
      <View
        {...viewProps}
        style={[eva.style, style]}
      />
    );
  }
}

export const Layout = styled<LayoutProps>(LayoutComponent);
