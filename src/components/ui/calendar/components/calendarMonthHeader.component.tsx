/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';

type ViewPropsWithoutChildren = Omit<ViewProps, 'children'>;

export interface CalendarMonthHeaderProps extends ViewPropsWithoutChildren {
  data: string[];
  children: (data: string, index: number) => React.ReactElement;
}

export type CalendarMonthHeaderElement = React.ReactElement<CalendarMonthHeaderProps>;

export const CalendarMonthHeader: React.FC<CalendarMonthHeaderProps> = ({
  style,
  data,
  children,
  ...viewProps
}) => {
  return (
    <View
      {...viewProps}
      style={[styles.container, style]}
    >
      {data.map(children)}
    </View>
  );
};

CalendarMonthHeader.displayName = 'CalendarMonthHeader';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
