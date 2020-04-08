import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, Text } from '@ui-kitten/components';

const DayCell = ({ date }, style) => (
  <View
    style={[styles.dayContainer, style.container]}>
    <Text style={style.text}>{`${date.getDate()}`}</Text>
    <Text style={[style.text, styles.value]}>
      {`${100 * date.getDate() + Math.pow(date.getDate(), 2)}$`}
    </Text>
  </View>
);

export const CalendarCustomDayShowcase = () => {

  const [date, setDate] = React.useState(null);

  return (
    <Calendar
      date={date}
      onSelect={nextDate => setDate(nextDate)}
      renderDay={DayCell}
    />
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  value: {
    fontSize: 12,
    fontWeight: '400',
  },
});
