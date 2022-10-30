import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Datepicker, Layout, Text } from '@ui-kitten/components';

const now = new Date();
const date = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
const initialDate = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate() + 1);

export const DatepickerInitialVisibleDateShowcase = (): React.ReactElement => {
  const [selectedDate, setSelectedDate] = React.useState(date);
  const [initialVisibleDate, setInitialVisibleDate] = React.useState(initialDate);

  const componentRef = React.createRef<Datepicker>();

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

  const onSelect = (nextDate): void => {
    setSelectedDate(nextDate);

    // clear initialVisibleDate to stop showing it when the datepicker is opened
    setInitialVisibleDate(undefined);
  };

  const renderFooter = (): React.ReactElement => {
    return (
      <View>
        <Button onPress={scrollToToday}>
          Scroll to Today
        </Button>
        <Button onPress={scrollToSelected}>
          Scroll to Selected Date
        </Button>
      </View>
    );
  };

  return (
    <Layout
      style={styles.container}
      level='1'
    >

      <View style={styles.calendarContainer}>
        <Text
          category='h6'
          style={styles.text}
        >
          {`Selected date: ${selectedDate.toLocaleDateString()}`}
        </Text>

        <Datepicker
          ref={componentRef}
          date={selectedDate}
          initialVisibleDate={initialVisibleDate}
          onSelect={onSelect}
          renderFooter={renderFooter}
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
