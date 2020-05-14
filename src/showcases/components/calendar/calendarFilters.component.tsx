import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, Layout, Text } from '@ui-kitten/components';

const useCalendarState = (initialState = null) => {
  const [date, setDate] = React.useState(initialState);
  return { date, onSelect: setDate };
};

const filter = (date) => date.getDay() !== 0 && date.getDay() !== 6;

const now = new Date();
const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

export const CalendarFiltersShowcase = () => {

  const minMaxCalendarState = useCalendarState();
  const filterCalendarState = useCalendarState();
  const boundingCalendarState = useCalendarState();

  return (
    <Layout style={styles.container} level='1'>

      <View style={styles.calendarContainer}>
        <Text style={styles.text} category='h6'>
          Min / Max
        </Text>

        <Calendar
          min={yesterday}
          max={tomorrow}
          {...minMaxCalendarState}
        />
      </View>

      <View style={styles.calendarContainer}>
        <Text style={styles.text} category='h6'>
          Filter
        </Text>

        <Calendar
          filter={filter}
          {...filterCalendarState}
        />
      </View>

      <View style={styles.calendarContainer}>
        <Text style={styles.text} category='h6'>
          Bounding Month
        </Text>

        <Calendar
          boundingMonth={false}
          {...boundingCalendarState}
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
