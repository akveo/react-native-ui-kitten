import React from 'react';
import { CalendarRange, RangeCalendar, Text } from '@ui-kitten/components';

export const RangeCalendarSimpleUsageShowcase = (): React.ReactElement => {

  const [range, setRange] = React.useState<CalendarRange<Date>>({});

  return (
    <>
    <Text testID='range-calendar-value'>{`Range: ${range.startDate ? range.startDate.getDate() : '-'} to ${range.endDate ? range.endDate.getDate() : '-'}`}</Text>
    <RangeCalendar
      testID='range-calendar'
      arrowLeftAccessibilityLabel='Previous month'
      arrowRightAccessibilityLabel='Next month'
      range={range}
      onSelect={nextRange => setRange(nextRange)}
    />
    </>
  );
};
