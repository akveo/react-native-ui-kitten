/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TargetedEvent,
} from 'react-native';
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from './touchableWithoutFeedback.component';

export interface TouchableWebProps extends TouchableWithoutFeedbackProps {
  onMouseEnter?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  onMouseLeave?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
}

export type TouchableWebElement = React.ReactElement<TouchableWebProps>;

/**
 * Helper component for the Touchable component rendered on the web.
 */
export class TouchableWeb extends React.Component<TouchableWebProps> {

  public render(): React.ReactElement {
    const { style, ...touchableProps } = this.props;

    return (
      <TouchableWithoutFeedback
        {...touchableProps}
        style={[styles.container, style]}
      />
    );
  }
}

const styles = Platform.OS === 'web' && StyleSheet.create({
  container: {
    // @ts-ignore
    outlineWidth: 0,
  },
});

