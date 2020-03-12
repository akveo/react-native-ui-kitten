import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Datepicker, Layout } from '@ui-kitten/components';

const useDatepickerState = (initialDate = null) => {
  const [date, setDate] = React.useState(initialDate);
  return { date, onSelect: setDate };
};

const filter = (date) => date.getDay() !== 0 && date.getDay() !== 6;

const now = new Date();
const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

export const DatepickerFiltersShowcase = () => {

  const minMaxPickerState = useDatepickerState();
  const filterPickerState = useDatepickerState();
  const boundingPickerState = useDatepickerState();

  return (
    <Layout style={styles.container} level='1'>

      <Datepicker
        placeholder='Min / Max'
        min={yesterday}
        max={tomorrow}
        {...minMaxPickerState}
      />

      <View style={styles.rowContainer}>

        <Datepicker
          style={styles.picker}
          placeholder='Date Filter'
          filter={filter}
          {...filterPickerState}
        />

        <Datepicker
          style={styles.picker}
          placeholder='Bounding Month'
          boundingMonth={false}
          {...boundingPickerState}
        />

      </View>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 360,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    flex: 1,
    margin: 2,
  },
});
