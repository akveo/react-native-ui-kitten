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
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface LayoutProps {
  children?: React.ReactElement<any>;
}

export type Props = LayoutProps & StyledComponentProps & ViewProps;

/**
 * The `Layout` component is component which behaves like React Native View.
 *
 * @extends React.Component
 *
 * @property {React.ReactElement<any>} children - Determines the children of the component.
 *
 * @property ViewProps
 *
 * @property StyledComponentProps
 *
 * @example Layout API example
 *
 * ```
 * import {
 *   Layout,
 *   Text,
 * } from '@kitten/ui';
 *
 * public render(): React.ReactNode {
 *   return (
 *     <Layout style={this.props.themedStyle.layout}>
 *       <Text>Layout</Text>
 *     </Layout>
 *   );
 * }
 * ```
 * */

export class Layout extends React.Component<Props> {

  static styledComponentName: string = 'Layout';

  private getComponentStyle = (style: StyleType): StyleType => {
    return {
      container: style,
    };
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, themedStyle, children, ...restProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <View {...restProps} style={[componentStyle.container, style]}>
        {children}
      </View>
    );
  }
}
