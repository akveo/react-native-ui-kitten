import React from 'react';
import { RangeCalendar } from '@ui-kitten/components';

export const RangeCalendarSimpleUsageShowcase = () => {

  const [range, setRange] = React.useState({
    startDate: null,
    endDate: null,
  });

  return (
    <RangeCalendar
      range={range}
      onSelect={setRange}
    />
  );
};
