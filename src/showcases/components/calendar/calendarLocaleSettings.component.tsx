import React from 'react';
import { Calendar, I18nConfig, NativeDateService } from '@ui-kitten/components';

const i18n: I18nConfig = {
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

export const CalendarLocaleSettingsShowcase = (): React.ReactElement => {

  const [date, setDate] = React.useState(new Date());

  return (
    <Calendar
      dateService={localeDateService}
      date={date}
      onSelect={nextDate => setDate(nextDate)}
    />
  );
};
