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

export type DividerProps = StyledComponentProps & ViewProps;
export type DividerElement = React.ReactElement<DividerProps>;

/**
 * Styled `Divider` component. Behaves like React Native `View`.
 * The key feature of using `Divider` instead of `View` is that
 * it automatically picks color fitting to current theme.
 *
 * @property ViewProps - Any props applied to View component.
 */
class DividerComponent extends React.Component<DividerProps> {

  static styledComponentName: string = 'Divider';

  public render(): DividerElement {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <View
        {...restProps}
        style={[themedStyle, style]}
      />
    );
  }
}

export const Divider = styled<DividerProps>(DividerComponent);
