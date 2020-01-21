import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Datepicker,
  Layout,
  NativeDateService,
} from '@ui-kitten/components';

const dateService = new NativeDateService('en', { format: 'DD.MM.YYYY' });

export const DatepickerDateFormatShowcase = () => {

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
