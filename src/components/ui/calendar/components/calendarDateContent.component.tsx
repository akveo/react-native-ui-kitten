/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';
import { Text } from '../../text/text.component';

export interface CalendarDateContentProps extends ViewProps {
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactText;
}

export type CalendarDateContentElement = React.ReactElement<CalendarDateContentProps>;

export class CalendarDateContent extends React.Component<CalendarDateContentProps> {

  public render(): React.ReactElement<ViewProps> {
    const { style, textStyle, children, ...viewProps } = this.props;

    return (
      <View
        {...viewProps}
        style={[styles.container, style]}>
        <Text style={textStyle}>{children}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
