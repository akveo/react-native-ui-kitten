import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Calendar, Layout, Text } from '@ui-kitten/components';

const now = new Date();
const date = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
const initialVisibleDate = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate() + 1);

export const CalendarInitialVisibleDateShowcase = (): React.ReactElement => {
  const [selectedDate, setSelectedDate] = React.useState(date);

  const componentRef = React.createRef<Calendar>();

  const scrollToSelected = (): void => {
    if (componentRef.current) {
      componentRef.current.scrollToDate(selectedDate);
    }
  };

  const scrollToToday = (): void => {
    if (componentRef.current) {
      componentRef.current.scrollToToday();
    }
  };

  return (
    <Layout
      style={styles.container}
      level='1'
    >

      <Button onPress={scrollToToday}>
        Scroll to Today
      </Button>
      <Button onPress={scrollToSelected}>
        Scroll to Selected Date
      </Button>

      <View style={styles.calendarContainer}>
        <Text
          category='h6'
          style={styles.text}
        >
          {`Selected date: ${selectedDate.toLocaleDateString()}`}
        </Text>

        <Calendar
          ref={componentRef}
          date={selectedDate}
          initialVisibleDate={initialVisibleDate}
          onSelect={nextDate => setSelectedDate(nextDate)}
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
