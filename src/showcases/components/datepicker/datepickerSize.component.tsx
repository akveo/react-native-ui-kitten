import React from 'react';
import { StyleSheet } from 'react-native';
import { Datepicker, Layout } from '@ui-kitten/components';

const useDatepickerState = (initialDate = null) => {
  const [date, setDate] = React.useState(initialDate);
  return { date, onSelect: setDate };
};

export const DatepickerSizeShowcase = () => {

  const smallDatepickerState = useDatepickerState();
  const mediumDatepickerState = useDatepickerState();
  const largeDatepickerState = useDatepickerState();

  return (
    <Layout style={styles.container} level='1'>

      <Datepicker
        style={styles.datepicker}
        size='small'
        placeholder='Small'
        {...smallDatepickerState}
      />

      <Datepicker
        style={styles.datepicker}
        size='medium'
        placeholder='Medium'
        {...mediumDatepickerState}
      />

      <Datepicker
        style={styles.datepicker}
        size='large'
        placeholder='Large'
        {...largeDatepickerState}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 420,
  },
  datepicker: {
    marginVertical: 2,
  },
});
