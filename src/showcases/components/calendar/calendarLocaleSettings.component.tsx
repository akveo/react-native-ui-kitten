import React from 'react';
import { Calendar, NativeDateService } from '@ui-kitten/components';

const i18n = {
  dayNames: {
    short: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    long: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  },
  monthNames: {
    short: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    long: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
  },
};

const localeDateService = new NativeDateService('ru', { i18n, startDayOfWeek: 1 });

export const CalendarLocaleSettingsShowcase = () => {

  const [date, setDate] = React.useState(new Date());

  return (
    <Calendar
      dateService={localeDateService}
      date={date}
      onSelect={nextDate => setDate(nextDate)}
    />
  );
};
