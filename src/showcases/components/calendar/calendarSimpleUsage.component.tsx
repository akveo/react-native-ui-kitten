import React from 'react';
import { Calendar, Text } from '@ui-kitten/components';

export const CalendarSimpleUsageShowcase = (): React.ReactElement => {

  const [date, setDate] = React.useState(new Date());

  return (
    <>
      <Text testID='calendar-value' category='h6'>
        {`Selected date: ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
      </Text>

      <Calendar
        testID='calendar'
        arrowLeftAccessibilityLabel='Previous month'

        arrowRightAccessibilityLabel='Next month'
        date={date}
        onSelect={nextDate => setDate(nextDate)}
      />
    </>
  );
};
