import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, Text } from '@ui-kitten/components';

const DayCell = ({ date }: { date: Date }, style): React.ReactElement => (
  <View
    style={[styles.dayContainer, style.container]}
  >
    <Text style={style.text}>
      {`${date.getDate()}`}
    </Text>
    <Text style={[style.text, styles.value]}>
      {`${100 * date.getDate() + Math.pow(date.getDate(), 2)}$`}
    </Text>
  </View>
);

export const CalendarCustomDayShowcase = (): React.ReactElement => {

  const [date, setDate] = React.useState(new Date());

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
