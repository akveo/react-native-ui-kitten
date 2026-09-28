import React from 'react';
import { StyleSheet } from 'react-native';
import { CalendarRange, Datepicker, Layout, RangeDatepicker, Text } from '@ui-kitten/components';

export const DatepickerFullWidthShowcase = (): React.ReactElement => {

  const [date, setDate] = React.useState<Date | null>(null);
  const [range, setRange] = React.useState<CalendarRange<Date>>({});

  return (
    <Layout
      testID='datepicker-full-width'
      style={styles.container}
      level='1'
    >
      <Text testID='datepicker-full-width-value'>
        {`Date: ${date ? date.getDate() : '-'}, range: ${range.startDate ? range.startDate.getDate() : '-'}`}
      </Text>
      <Datepicker
        testID='datepicker-full-width-picker'
        style={styles.picker}
        placeholder='Full width calendar'
        popoverProps={{ fullWidth: true, style: styles.popover }}
        date={date}
        onSelect={setDate}
      />
      <RangeDatepicker
        testID='datepicker-full-width-range'
        style={styles.picker}
        placeholder='Full width range'
        popoverProps={{ fullWidth: true }}
        range={range}
        onSelect={setRange}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 420,
  },
  picker: {
    marginTop: 8,
  },
  popover: {
    borderRadius: 16,
  },
});
