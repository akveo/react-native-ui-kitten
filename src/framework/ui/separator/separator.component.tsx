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

export type SeparatorProps = StyledComponentProps & ViewProps;
export type SeparatorElement = React.ReactElement<SeparatorProps>;

class SeparatorComponent extends React.Component<SeparatorProps> {

  static styledComponentName: string = 'Separator';

  public render(): SeparatorElement {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <View
        {...restProps}
        style={[themedStyle, style]}
      />
    );
  }
}

export const Separator = styled<SeparatorProps>(SeparatorComponent);
