/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
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
  renderPressable,
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
    // Renders the Pressable directly rather than through TouchableWithoutFeedback: one fiber less
    // on every interactive component.
    return renderPressable(this.props, styles.container || undefined);
  }
}

const styles = Platform.OS === 'web' ? StyleSheet.create({
  container: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    outlineWidth: 0,
  },
}) : { container: undefined };

