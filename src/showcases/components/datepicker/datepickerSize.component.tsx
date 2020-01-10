import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Datepicker,
  Layout,
} from '@ui-kitten/components';

const useDatepickerChanges = (initialDate = null) => {
  const [date, setDate] = React.useState(initialDate);
  return {
    date,
    onSelect: setDate,
  };
};

export const DatepickerSizeShowcase = () => {

  const smallDatepickerChanges = useDatepickerChanges();
  const mediumDatepickerChanges = useDatepickerChanges();
  const largeDatepickerChanges = useDatepickerChanges();

  return (
    <Layout style={styles.container}>

      <Datepicker
        style={styles.datepicker}
        size='small'
        placeholder='Small'
        {...smallDatepickerChanges}
      />

      <Datepicker
        style={styles.datepicker}
        size='medium'
        placeholder='Medium'
        {...mediumDatepickerChanges}
      />

      <Datepicker
        style={styles.datepicker}
        size='large'
        placeholder='Large'
        {...largeDatepickerChanges}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 400,
  },
  datepicker: {
    marginVertical: 8,
  },
});
