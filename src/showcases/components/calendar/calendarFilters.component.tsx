import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, CalendarProps, Layout, Text } from '@ui-kitten/components';

const useCalendarState = (initialState = null): CalendarProps => {
  const [date, setDate] = React.useState(initialState);
  return { date, onSelect: setDate } as any;
};

const filter = (date: any): boolean => date.getDay() !== 0 && date.getDay() !== 6;

const now = new Date();
const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

export const CalendarFiltersShowcase = (): React.ReactElement => {

  const minMaxCalendarState = useCalendarState();
  const filterCalendarState = useCalendarState();
  const boundingCalendarState = useCalendarState();

  return (
    <Layout
      style={styles.container}
      level='1'
    >

      <View style={styles.calendarContainer}>
        <Text
          style={styles.text}
          category='h6'
        >
          Min / Max
        </Text>

        <Text testID='calendar-minmax-value'>{`Selected: ${minMaxCalendarState.date ? minMaxCalendarState.date.getDate() : 'none'}`}</Text>
        <Calendar
          testID='calendar-minmax'
          min={yesterday}
          max={tomorrow}
          {...minMaxCalendarState}
        />
      </View>

      <View style={styles.calendarContainer}>
        <Text
          style={styles.text}
          category='h6'
        >
          Filter
        </Text>

        <Text testID='calendar-filter-value'>{`Selected: ${filterCalendarState.date ? filterCalendarState.date.getDate() : 'none'}`}</Text>
        <Calendar
          testID='calendar-filter'
          filter={filter}
          {...filterCalendarState}
        />
      </View>

      <View style={styles.calendarContainer}>
        <Text
          style={styles.text}
          category='h6'
        >
          Bounding Month
        </Text>

        <Text testID='calendar-bounding-value'>{`Selected: ${boundingCalendarState.date ? boundingCalendarState.date.getDate() : 'none'}`}</Text>
        <Calendar
          testID='calendar-bounding'
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
