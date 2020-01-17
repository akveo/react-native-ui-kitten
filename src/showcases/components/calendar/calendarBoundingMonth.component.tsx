import React from 'react';
import { Calendar } from '@ui-kitten/components';

export const CalendarBoundingMonthShowcase = () => {

  const [date, setDate] = React.useState(null);

  return (
    <Calendar
      date={date}
      onSelect={setDate}
      boundingMonth={false}
    />
  );
};
