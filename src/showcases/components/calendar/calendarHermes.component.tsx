import React from 'react';
import { StyleSheet } from 'react-native';
import { Calendar, CalendarViewModes, Layout, Text } from '@ui-kitten/components';

// Hermes date probes: #1797 (month picker for 1981-1984 showed "Mar" twice) and #1439 (picked
// dates believed to come back in UTC). Echoes the engine, the device time zone and the picked
// date's local and UTC parts.

declare const HermesInternal: unknown;

const engine = typeof HermesInternal === 'object' && HermesInternal !== null ? 'hermes' : 'jsc';
const offset = -new Date(1982, 2, 1).getTimezoneOffset();
// Years in 1970-2000 where `new Date(y, i, 1).getMonth()` is not 0..11, or where the first of a
// month rolls to another day: the two ways a month label could repeat in the picker.
const oddYears = Array.from({ length: 31 }, (_, k) => 1970 + k).filter((year) =>
  Array.from({ length: 12 }, (_, i) => new Date(year, i, 1)).some((d, i) => d.getMonth() !== i || d.getDate() !== 1),
);
const describe = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()} local | ` +
  `${date.toISOString()} | ms ${date.getTime()}`;

export const CalendarHermesShowcase = (): React.ReactElement => {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <Text testID='calendar-hermes-engine' category='c1'>
        {`engine: ${engine}, offset(1982-03): ${offset} min, odd years 1970-2000: ${oddYears.length ? oddYears.join(',') : 'none'}`}
      </Text>
      <Text testID='calendar-hermes-picked' category='c1'>
        {date ? describe(date) : 'picked: none'}
      </Text>
      <Calendar
        testID='calendar-hermes'
        date={date}
        initialVisibleDate={new Date(1982, 2, 15)}
        startView={CalendarViewModes.MONTH}
        min={new Date(1970, 0, 1)}
        max={new Date(2000, 11, 31)}
        onSelect={setDate}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 420,
  },
});
