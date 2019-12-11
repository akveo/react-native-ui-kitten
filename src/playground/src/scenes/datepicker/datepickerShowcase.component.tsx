import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Datepicker,
  DatepickerElement,
  DatepickerProps,
} from '@ui-kitten/components';

type DatepickerShowcaseProps = Omit<DatepickerProps, 'onSelect'>;

export const DatepickerShowcase = (props: DatepickerShowcaseProps): DatepickerElement => {

  const [date, setDate] = React.useState<Date>(null);

  return (
    <Datepicker
      {...props}
      style={styles.datepicker}
      date={date}
      onSelect={setDate}
    />
  );
};

const styles = StyleSheet.create({
  datepicker: {
    width: 200,
  },
});

