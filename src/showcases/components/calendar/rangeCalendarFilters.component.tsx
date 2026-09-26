import React from 'react';
import { StyleSheet } from 'react-native';
import { CalendarRange, Layout, RangeCalendar, Text } from '@ui-kitten/components';

// The 5th of every month is unavailable. Picking a range around it restarts the range instead of
// spanning the blocked day.
const filter = (date: Date): boolean => date.getDate() !== 5;

const formatRange = (range: CalendarRange<Date>): string => {
  const start = range.startDate ? range.startDate.toLocaleDateString() : '—';
  const end = range.endDate ? range.endDate.toLocaleDateString() : '—';
  return `${start} → ${end}`;
};

export const RangeCalendarFiltersShowcase = (): React.ReactElement => {

  const [range, setRange] = React.useState<CalendarRange<Date>>({});

  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <Text
        category='s1'
        testID='range-calendar-filters-value'
      >
        {`Selected range: ${formatRange(range)}`}
      </Text>

      <RangeCalendar
        arrowLeftAccessibilityLabel='Previous month'
        arrowRightAccessibilityLabel='Next month'
        filter={filter}
        range={range}
        onSelect={nextRange => setRange(nextRange)}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 400,
  },
});
