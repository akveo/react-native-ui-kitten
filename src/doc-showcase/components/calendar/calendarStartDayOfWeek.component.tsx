import React from 'react';
import {
  Calendar,
  NativeDateService,
} from '@ui-kitten/components';

const dateService = new NativeDateService('en', { startDayOfWeek: 1 });

export const CalendarStartDayOfWeekShowcase = () => {

  const [date, setDate] = React.useState(null);

  return (
    <Calendar
      dateService={dateService}
      date={date}
      onSelect={setDate}
    />
  );
};
