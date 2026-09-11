import React from 'react';
import { CalendarRange, RangeCalendar } from '@ui-kitten/components';

export const RangeCalendarSimpleUsageShowcase = (): React.ReactElement => {

  const [range, setRange] = React.useState<CalendarRange<Date>>({});

  return (
    <RangeCalendar
      arrowLeftAccessibilityLabel='Previous month'
      arrowRightAccessibilityLabel='Next month'
      range={range}
      onSelect={nextRange => setRange(nextRange)}
    />
  );
};
