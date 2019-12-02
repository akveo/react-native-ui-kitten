import React from 'react';
import { RangeCalendar } from 'react-native-ui-kitten';

export const RangeCalendarSimpleUsageShowcase = () => {

  const [range, setRange] = React.useState({ startDate: null, endDate: null });

  return (
    <RangeCalendar
      range={range}
      onSelect={setRange}
    />
  );
};
