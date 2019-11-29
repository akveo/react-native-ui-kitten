import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Datepicker,
  Layout,
} from 'react-native-ui-kitten';

export const DatepickerBoundingMonthShowcase = () => {

  const [selectedDate, setSelectedDate] = React.useState(null);

  return (
    <Layout style={styles.container}>
      <Datepicker
        placeholder='Pick Date'
        date={selectedDate}
        onSelect={setSelectedDate}
        boundingMonth={false}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 376,
  },
});
