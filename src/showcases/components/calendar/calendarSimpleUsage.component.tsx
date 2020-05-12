import React from 'react';
import { Calendar, Text } from '@ui-kitten/components';

export const CalendarSimpleUsageShowcase = () => {

  const [date, setDate] = React.useState(new Date());

  return (
    <React.Fragment>

      <Text category='h6'>
        Selected date: {date.toLocaleDateString()}
      </Text>

      <Calendar
        date={date}
        onSelect={nextDate => setDate(nextDate)}
      />

    </React.Fragment>
  );
};
