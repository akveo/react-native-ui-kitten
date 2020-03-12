import React from 'react';
import { StyleSheet } from 'react-native';
import { Datepicker, Layout, NativeDateService } from '@ui-kitten/components';

const useDatepickerState = (initialDate = null) => {
  const [date, setDate] = React.useState(initialDate);
  return { date, onSelect: setDate };
};

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
const formatDateService = new NativeDateService('en', { format: 'DD.MM.YYYY' });

export const DatepickerLocaleSettingsShowcase = () => {

  const dateFormatPickerState = useDatepickerState();
  const localePickerState = useDatepickerState();

  return (
    <Layout style={styles.container} level='1'>

      <Datepicker
        style={styles.picker}
        placeholder='Date Format'
        dateService={formatDateService}
        {...dateFormatPickerState}
      />

      <Datepicker
        style={styles.picker}
        placeholder='Locale'
        dateService={localeDateService}
        {...localePickerState}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 360,
  },
  picker: {
    flex: 1,
    marginHorizontal: 2,
  },
});
