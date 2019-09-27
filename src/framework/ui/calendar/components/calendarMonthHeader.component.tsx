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

interface ComponentProps extends ViewProps {
  data: string[];
  children: (data: string, index: number) => React.ReactElement<any>;
}

export type CalendarMonthHeaderProps = ComponentProps;
export type CalendarMonthHeaderElement = React.ReactElement<CalendarMonthHeaderProps>;

export class CalendarMonthHeader extends React.Component<CalendarMonthHeaderProps> {

  public render(): React.ReactElement<ViewProps> {
    const { style, data, children, ...restProps } = this.props;

    return (
      <View
        {...restProps}
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
