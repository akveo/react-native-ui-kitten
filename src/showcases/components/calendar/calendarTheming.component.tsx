import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, Layout, RangeCalendar, Text } from '@ui-kitten/components';

export const CalendarThemingShowcase = () => {

  const [date, setDate] = React.useState(new Date());
  const [range, setRange] = React.useState({});

  return (
    <Layout style={styles.container} level='1'>

      <View style={styles.calendarContainer}>
        <Text style={styles.text} category='h6'>
          Date
        </Text>

        <Calendar
          date={date}
          onSelect={nextDate => setDate(nextDate)}
        />
      </View>

      <View style={styles.calendarContainer}>
        <Text style={styles.text} category='h6'>
          Date Ranges
        </Text>

        <RangeCalendar
          range={range}
          onSelect={nextRange => setRange(nextRange)}
        />
      </View>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarContainer: {
    margin: 2,
  },
  text: {
    marginVertical: 8,
  },
});
