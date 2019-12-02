import React from 'react';
import { Calendar } from '@ui-kitten/components';

const now = new Date();
const minDate = new Date(now.getFullYear(), now.getMonth(), 15);
const maxDate = new Date(now.getFullYear(), now.getMonth() + 1, 15);

export const CalendarBoundsShowcase = () => {

  const [date, setDate] = React.useState(null);

  return (
    <Calendar
      min={minDate}
      max={maxDate}
      date={date}
      onSelect={setDate}
    />
  );
};
