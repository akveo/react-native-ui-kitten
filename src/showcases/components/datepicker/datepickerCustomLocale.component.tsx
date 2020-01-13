import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Datepicker,
  Layout,
  NativeDateService,
} from '@ui-kitten/components';

const i18n = {
  dayNames: {
    short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  monthNames: {
    short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'],
    long: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
};

const dateService = new NativeDateService('en', { i18n });

export const DatepickerCustomLocaleShowcase = () => {

  const [selectedDate, setSelectedDate] = React.useState(null);

  return (
    <Layout style={styles.container}>
      <Datepicker
        placeholder='Pick Date'
        date={selectedDate}
        onSelect={setSelectedDate}
        dateService={dateService}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 376,
  },
});
