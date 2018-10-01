const weekDays = [
  'S',
  'M',
  'T',
  'W',
  'T',
  'F',
  'S',
];
const months = [
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
];

class CalendarLocale {
  locale = '';

  constructor(locale) {
    this.locale = locale;
  }

  /**
   * returns first day of the week, it can be 1 if week starts from monday
   * and 0 if from sunday and so on.
   * */
  getFirstDayOfWeek() {
    // TODO: locale-dependent
    return 0;
  }

  getMonthName(date) {
    // TODO: locale-dependent
    return months[date.getMonth()];
  }

  getDayOfWeekNames() {
    // TODO: locale-dependent
    return this.shift(weekDays, 0, this.getFirstDayOfWeek());
  }

  /**
   * shifts array on N positions depending on direction
   *
   * @param array - source array
   * @param direction - shift direction. 0 for right, 1 for left
   * @param n - number of positions to shift
   */
  shift(array, n, direction = 0) {
    const times = n > array.length ? n % array.length : n;
    return array.concat(array.splice(0, (direction > 0 ? array.length - times : times)));
  }
}

export default new CalendarLocale();
