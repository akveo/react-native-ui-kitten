import React from 'react';
import { Calendar } from 'react-native-ui-kitten';

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
