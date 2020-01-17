import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Datepicker,
  Layout,
} from '@ui-kitten/components';

export const DatepickerFilterShowcase = () => {

  const [selectedDate, setSelectedDate] = React.useState(null);

  const filter = (date) => date.getDay() !== 0 && date.getDay() !== 6;

  return (
    <Layout style={styles.container}>
      <Datepicker
        placeholder='Pick Date'
        date={selectedDate}
        onSelect={setSelectedDate}
        filter={filter}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 376,
  },
});
