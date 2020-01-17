import React from 'react';
import {
  Calendar,
  NativeDateService,
} from '@ui-kitten/components';

const i18n = {
  dayNames: {
    short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  monthNames: {
    short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'],
    long: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
};

const dateService = new NativeDateService('en', { i18n });

export const CalendarCustomLocaleShowcase = () => {

  const [date, setDate] = React.useState(null);

  return (
    <Calendar
      dateService={dateService}
      date={date}
      onSelect={setDate}
    />
  );
};
