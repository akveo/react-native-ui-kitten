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

export class Layout extends React.Component<Props> {

  static styledComponentName: string = 'Layout';

  private getComponentStyle = (style: StyleType): StyleType => {
    return {
      container: style,
    };
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, themedStyle, children, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <View {...derivedProps} style={[componentStyle.container, style]}>
        {children}
      </View>
    );
  }
}
