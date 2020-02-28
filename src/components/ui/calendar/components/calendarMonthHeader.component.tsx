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

export interface CalendarMonthHeaderProps extends ViewProps {
  data: string[];
  children: (data: string, index: number) => React.ReactElement;
}

export type CalendarMonthHeaderElement = React.ReactElement<CalendarMonthHeaderProps>;

export class CalendarMonthHeader extends React.Component<CalendarMonthHeaderProps> {

  public render(): React.ReactElement<ViewProps> {
    const { style, data, children, ...viewProps } = this.props;

    return (
      <View
        {...viewProps}
        style={[styles.container, style]}>
        {data.map(children)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
