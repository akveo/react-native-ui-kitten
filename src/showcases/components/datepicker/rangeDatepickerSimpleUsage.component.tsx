import React from 'react';
import { StyleSheet } from 'react-native';
import { CalendarRange, Layout, RangeDatepicker } from '@ui-kitten/components';

export const RangeDatepickerSimpleUsageShowcase = (): React.ReactElement => {

  const [range, setRange] = React.useState<CalendarRange<Date>>({});

  return (
    <Layout
      style={styles.container}
      level='1'
    >

      <RangeDatepicker

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

