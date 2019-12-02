/**
 * IMPORTANT: To use Moment make sure to install Moment Date Service
 * npm i @ui-kitten/moment
 */

import React from 'react';
import { Calendar } from 'react-native-ui-kitten';
import { MomentDateService } from '@ui-kitten/moment';
import moment from 'moment';

const dateService = new MomentDateService();

export const CalendarMomentShowcase = () => {

  const [date, setDate] = React.useState(moment());

  return (
    <Calendar
      dateService={dateService}
      date={date}
      onSelect={setDate}
    />
  );
};
