/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Insets,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export interface TouchableWithoutFeedbackProps extends TouchableOpacityProps {
  useDefaultHitSlop?: boolean;
  children?: React.ReactNode;
}

export type TouchableWithoutFeedbackElement = React.ReactElement<TouchableWithoutFeedbackProps>;

/**
 * Helper component for the Touchable component with no opacity feedback.
 *
 * Applies recommended hitSlop by default.
 * @see https://reactnative.dev/docs/view#hitslop
 *
 * Allows passing ReactNode as children whereas original TouchableWithoutFeedback not.
 */
export class TouchableWithoutFeedback extends React.Component<TouchableWithoutFeedbackProps> {

  private createHitSlopInsets = (): Insets => {
    const flatStyle: ViewStyle = StyleSheet.flatten(this.props.style || {});

    // @ts-ignore: `width` is restricted to be a number
    const value: number = 40 - flatStyle.height || 0;

    return {
      left: value,
      top: value,
      right: value,
      bottom: value,
    };
  };

  public render(): React.ReactElement {
    return (
      <TouchableOpacity
        activeOpacity={1.0}
        hitSlop={this.props.useDefaultHitSlop && this.createHitSlopInsets()}
        {...this.props}
      />
    );
  }
}
