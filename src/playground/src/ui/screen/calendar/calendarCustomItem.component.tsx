import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import { StyleType } from '@kitten/theme';
import { Text } from '@kitten/ui';

export const CalendarCustomItem = (date: Date, style: StyleType): React.ReactElement<ViewProps> => {

  const value = (d: Date): number => {
    return 100 * d.getDate() + Math.pow(d.getDate(), 2);
  };

  return (
    <View
      style={[styles.container, style.container]}>
      <Text style={style.text}>{`${date.getDate()}`}</Text>
      <Text style={[style.text, styles.value]}>{`${value(date)}$`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 12,
    fontWeight: 'normal',
  },
});
