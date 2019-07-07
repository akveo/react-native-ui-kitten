import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import { StyleType } from '@kitten/theme';
import { Text } from '@kitten/ui';

export const CalendarCustomItem = (date: Date, style: StyleType): React.ReactElement<ViewProps> => {

  const value: number = 100 * date.getDate() + Math.pow(date.getDate(), 2);

  return (
    <View
      style={[styles.container, style.container]}>
      <Text style={style.text}>{`${date.getDate()}`}</Text>
      <Text style={[style.text, styles.value]}>{`${value}$`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  value: {
    fontSize: 12,
    fontWeight: 'normal',
  },
});
