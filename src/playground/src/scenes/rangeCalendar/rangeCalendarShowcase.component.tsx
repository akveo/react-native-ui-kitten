import React from 'react';
import {
  RangeCalendar,
  RangeCalendarElement,
  RangeCalendarProps,
} from 'react-native-ui-kitten';

export const RangeCalendarShowcase = (props: RangeCalendarProps): RangeCalendarElement => {

  const [range, setRange] = React.useState({});

  return (
    <RangeCalendar
      {...props}
      range={range}
      onSelect={setRange}
    />
  );
};
