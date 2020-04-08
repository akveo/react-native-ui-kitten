import React from 'react';
import { RangeCalendar } from '@ui-kitten/components';

export const RangeCalendarSimpleUsageShowcase = () => {

  const [range, setRange] = React.useState({});

  return (
    <RangeCalendar
      range={range}
      onSelect={nextRange => setRange(nextRange)}
    />
  );
};
