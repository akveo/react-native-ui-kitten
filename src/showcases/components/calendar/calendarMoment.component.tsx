/**
 * IMPORTANT: To use Moment make sure to install Moment Date Service
 * npm i @ui-kitten/moment
 */

import React from 'react';
import { Calendar } from '@ui-kitten/components';
import { MomentDateService } from '@ui-kitten/moment';
import moment from 'moment';
import 'moment/locale/en-gb';

// en-gb starts the week on Monday, so the weekday header must begin with "Mo".
const dateService = new MomentDateService('en-gb');

export const CalendarMomentShowcase = (): React.ReactElement => {

  const [date, setDate] = React.useState(moment());

  return (
    <Calendar
      dateService={dateService}
      date={date}
      onSelect={nextDate => setDate(nextDate)}
    />
  );
};
