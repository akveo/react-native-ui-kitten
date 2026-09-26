import React from 'react';
import { StyleSheet } from 'react-native';
import { CalendarRange, Layout, RangeDatepicker, Text } from '@ui-kitten/components';

export const RangeDatepickerSimpleUsageShowcase = (): React.ReactElement => {

  const [range, setRange] = React.useState<CalendarRange<Date>>({});

  return (
    <Layout
      style={styles.container}
      level='1'
    >

      <Text testID='range-datepicker-value'>{`Range: ${range.startDate ? range.startDate.getDate() : '-'} to ${range.endDate ? range.endDate.getDate() : '-'}`}</Text>
      <RangeDatepicker
        testID='range-datepicker'
        arrowLeftAccessibilityLabel='Previous month'

        arrowRightAccessibilityLabel='Next month'
        range={range}
        onSelect={nextRange => setRange(nextRange)}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 360,
  },
});

