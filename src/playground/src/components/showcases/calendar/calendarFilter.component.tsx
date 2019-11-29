import React from 'react';
import { Calendar } from 'react-native-ui-kitten';

export const CalendarFilterShowcase = () => {

  const [selectedDate, setSelectedDate] = React.useState(null);

  const filter = (date) => date.getDay() !== 0 && date.getDay() !== 6;

  return (
    <Calendar
      date={selectedDate}
      onSelect={setSelectedDate}
      filter={filter}
    />
  );
};
