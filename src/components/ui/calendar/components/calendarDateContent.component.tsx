/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
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
  children: string | number;
}

export type CalendarDateContentElement = React.ReactElement<CalendarDateContentProps>;

export const CalendarDateContent: React.FC<CalendarDateContentProps> = ({
  style,
  textStyle,
  children,
  ...viewProps
}) => {
  return (
    <View
      {...viewProps}
      style={[styles.container, style]}
    >
      <Text style={textStyle}>
        {children}
      </Text>
    </View>
  );
};

CalendarDateContent.displayName = 'CalendarDateContent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
