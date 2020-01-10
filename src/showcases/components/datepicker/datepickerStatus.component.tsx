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

export const DatepickerStatusShowcase = () => {

  const primaryDatepickerChanges = useDatepickerChanges();
  const successDatepickerChanges = useDatepickerChanges();
  const infoDatepickerChanges = useDatepickerChanges();
  const warningDatepickerChanges = useDatepickerChanges();
  const dangerDatepickerChanges = useDatepickerChanges();
  const basicDatepickerChanges = useDatepickerChanges();

  return (
    <Layout style={styles.container}>

      <Datepicker
        style={styles.datepicker}
        status='primary'
        placeholder='Primary'
        {...primaryDatepickerChanges}
      />

      <Datepicker
        style={styles.datepicker}
        status='success'
        placeholder='Success'
        {...successDatepickerChanges}
      />

      <Datepicker
        style={styles.datepicker}
        status='info'
        placeholder='Info'
        {...infoDatepickerChanges}
      />

      <Datepicker
        style={styles.datepicker}
        status='warning'
        placeholder='Warning'
        {...warningDatepickerChanges}
      />

      <Datepicker
        style={styles.datepicker}
        status='danger'
        placeholder='Danger'
        {...dangerDatepickerChanges}
      />

      <Datepicker
        style={styles.datepicker}
        status='basic'
        placeholder='Basic'
        {...basicDatepickerChanges}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 376,
  },
  datepicker: {
    margin: 8,
  },
});
