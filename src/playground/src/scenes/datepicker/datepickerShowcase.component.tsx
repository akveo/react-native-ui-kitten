import React from 'react';
import {
  Datepicker,
  DatepickerElement,
  DatepickerProps,
} from '@ui-kitten/components';

type DatepickerShowcaseProps = Omit<DatepickerProps, 'onSelect'>;

export const DatepickerShowcase = (props: DatepickerShowcaseProps): DatepickerElement => {

  const [date, setDate] = React.useState<Date>(null);

  return (
    <Datepicker
      {...props}
      date={date}
      onSelect={setDate}
    />
  );
};
