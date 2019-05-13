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
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

type ChildElement = React.ReactElement<any>;
type ChildrenProp = ChildElement | ChildElement[];

interface ComponentProps {
  children?: ChildrenProp;
}

export type LayoutProps = StyledComponentProps & ViewProps & ComponentProps;

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

export class LayoutComponent extends React.Component<LayoutProps> {

  static styledComponentName: string = 'Layout';

  private getComponentStyle = (source: StyleType): StyleType => {
    return {
      ...source,
      ...StyleSheet.flatten(this.props.style),
    };
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, themedStyle, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <View
        {...derivedProps}
        style={componentStyle}
      />
    );
  }
}

export const Layout = styled<LayoutProps>(LayoutComponent);
