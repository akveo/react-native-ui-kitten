import React from 'react';
import { StyleSheet } from 'react-native';
import { Datepicker, Layout, Text } from '@ui-kitten/components';

export const DatepickerSimpleUsageShowcase = (): React.ReactElement => {

  const [date, setDate] = React.useState(new Date());

  return (
    <Layout
      style={styles.container}
      level='1'
    >

      <Text testID='datepicker-value' category='s1'>
        {`Selected date: ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
      </Text>

      <Datepicker
        testID='datepicker'
        label='Date'
        caption='Pick a date'
        arrowLeftAccessibilityLabel='Previous month'

        arrowRightAccessibilityLabel='Next month'
        date={date}
        onSelect={nextDate => setDate(nextDate)}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 376,
  },
});
