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
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';

interface ComponentProps extends ViewProps {
  weekdays: string[];
  weekdayStyle?: StyleProp<TextStyle>;
}

export type CalendarMonthHeaderProps = ThemedComponentProps & ComponentProps;
export type CalendarMonthHeaderElement = React.ReactElement<CalendarMonthHeaderProps>;

class CalendarMonthHeaderComponent extends React.Component<CalendarMonthHeaderProps> {

  private isHoliday = (index: number): boolean => {
    return index % 6 === 0;
  };

  private renderWeekdayElement = (weekday: string, index: number): TextElement => {
    const holidayStyle: TextStyle = this.isHoliday(index) && this.props.themedStyle.holiday;

    return (
      <Text
        key={index}
        style={[this.props.themedStyle.weekday, this.props.weekdayStyle, holidayStyle]}>
        {weekday}
      </Text>
    );
  };

  private renderWeekdayElements = (source: string[]): TextElement[] => {
    return source.map(this.renderWeekdayElement);
  };

  public render(): React.ReactElement<ViewProps> {
    const { themedStyle, style, weekdayStyle, weekdays, ...restProps } = this.props;
    const weekdayElements: TextElement[] = this.renderWeekdayElements(weekdays);

    return (
      <View
        {...restProps}
        style={[themedStyle.container, style]}>
        <View style={themedStyle.weekdayContainer}>
          {weekdayElements}
        </View>
      </View>
    );
  }
}

export const CalendarMonthHeader = withStyles(CalendarMonthHeaderComponent, (theme: ThemeType) => ({
  container: {
    justifyContent: 'center',
  },
  weekdayContainer: {
    flexDirection: 'row',
  },
  weekday: {
    textAlign: 'center',
  },
  holiday: {
    color: theme['color-danger-default'],
  },
}));
