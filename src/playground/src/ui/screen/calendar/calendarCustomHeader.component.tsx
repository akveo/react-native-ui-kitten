import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import { StyleType } from '@kitten/theme';
import {
  DateService,
  NativeDateService,
  Text,
  TextElement,
} from '@kitten/ui';

const dateService: DateService<Date> = new NativeDateService('en-US');

export const CalendarCustomHeader = (date: Date, style: StyleType): React.ReactElement<ViewProps> => {

  const monthName: string = dateService.getMonthName(date);
  const dayOfWeekNames: string[] = dateService.getDayOfWeekNames('short');

  const renderWeekdayElement = (weekday: string, index: number): TextElement => {
    return (
      <Text
        key={index}
        style={[style.weekday, styles.weekday]}>
        {weekday}
      </Text>
    );
  };

  return (
    <View
      style={[styles.container, style]}>
      <Text style={[styles.nameText, style.month]}>
        {`${monthName}, ${date.getFullYear()}`}
      </Text>
      <View style={styles.weekdayContainer}>
        {dayOfWeekNames.map(renderWeekdayElement)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  weekdayContainer: {
    flexDirection: 'row',
  },
  nameText: {
    textAlign: 'center',
  },
  weekday: {
    textAlign: 'center',
  },
});
