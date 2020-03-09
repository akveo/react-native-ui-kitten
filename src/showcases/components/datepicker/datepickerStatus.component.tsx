import React from 'react';
import { StyleSheet } from 'react-native';
import { Datepicker, Layout } from '@ui-kitten/components';

const useDatepickerState = (initialDate = null) => {
  const [date, setDate] = React.useState(initialDate);
  return { date, onSelect: setDate };
};

export const DatepickerStatusShowcase = () => {

  const primaryDatepickerState = useDatepickerState();
  const successDatepickerState = useDatepickerState();
  const infoDatepickerState = useDatepickerState();
  const warningDatepickerState = useDatepickerState();
  const dangerDatepickerState = useDatepickerState();
  const basicDatepickerState = useDatepickerState();

  return (
    <Layout style={styles.container}>

      <Layout style={styles.rowContainer}>

        <Datepicker
          style={styles.picker}
          status='primary'
          placeholder='Primary'
          {...primaryDatepickerState}
        />

        <Datepicker
          style={styles.picker}
          status='success'
          placeholder='Success'
          {...successDatepickerState}
        />

      </Layout>

      <Layout style={styles.rowContainer}>

        <Datepicker
          style={styles.picker}
          status='info'
          placeholder='Info'
          {...infoDatepickerState}
        />

        <Datepicker
          style={styles.picker}
          status='warning'
          placeholder='Warning'
          {...warningDatepickerState}
        />

      </Layout>

      <Layout style={styles.rowContainer}>

        <Datepicker
          style={styles.picker}
          status='danger'
          placeholder='Danger'
          {...dangerDatepickerState}
        />

        <Datepicker
          style={styles.picker}
          status='basic'
          placeholder='Basic'
          {...basicDatepickerState}
        />

      </Layout>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 480,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
    margin: 2,
  },
});
