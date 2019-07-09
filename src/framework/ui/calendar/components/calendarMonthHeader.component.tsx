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
import {
  Text,
  TextElement,
} from '../../text/text.component';

interface ComponentProps extends ViewProps {
  weekdays: string[];
  weekdayStyle?: StyleProp<TextStyle>;
}

export type CalendarMonthHeaderProps = ComponentProps;
export type CalendarMonthHeaderElement = React.ReactElement<CalendarMonthHeaderProps>;

export class CalendarMonthHeader extends React.Component<CalendarMonthHeaderProps> {

  private renderWeekdayElement = (weekday: string, index: number): TextElement => {
    return (
      <Text
        key={index}
        style={[styles.weekday, this.props.weekdayStyle]}>
        {weekday}
      </Text>
    );
  };

  private renderWeekdayElements = (source: string[]): TextElement[] => {
    return source.map(this.renderWeekdayElement);
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, weekdayStyle, weekdays, ...restProps } = this.props;
    const weekdayElements: TextElement[] = this.renderWeekdayElements(weekdays);

    return (
      <View
        {...restProps}
        style={[styles.container, style]}>
        <View style={styles.weekdayContainer}>
          {weekdayElements}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  weekdayContainer: {
    flexDirection: 'row',
  },
  weekday: {
    textAlign: 'center',
  },
});
