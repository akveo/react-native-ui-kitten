import React from 'react';
import {
  Datepicker,
  DatepickerElement,
  DatepickerProps,
} from 'react-native-ui-kitten';

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
