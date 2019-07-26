/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface ComponentProps {
  level?: string;
  children?: React.ReactNode;
}

export type LayoutProps = StyledComponentProps & ViewProps & ComponentProps;
export type LayoutElement = React.ReactElement<LayoutProps>;

/**
 * Layout container component. Behaves like React Native View.
 * The key feature of using Layout instead of View is that
 * it automatically picks background color fitting to current theme.
 *
 * @extends React.Component
 *
 * @property {string} level - Determines background color level of component.
 * Can be `level='1'`, `level='2'`, `level='3'` or `level='4'`.
 *
 * @property {React.ReactElement<any> | React.ReactElement<any>[]} children - Determines the children of the component.
 *
 * @property ViewProps
 *
 * @property StyledComponentProps
 *
 * @example Layout usage and API example
 *
 * ```
 * import React from 'react';
 * import {
 *   Layout,
 *   Text,
 * } from 'react-native-ui-kitten';
 *
 * public render(): React.ReactNode {
 *   return (
 *     <Layout>
 *       <Text>Layout</Text>
 *     </Layout>
 *   );
 * }
 * ```
 * */

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
