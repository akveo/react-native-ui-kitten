class CalendarLocale {
  locale = '';

  weekDays = [];

  constructor(locale) {
    this.locale = locale;

    const first = new Date(2018, 8, 2 + this.getFirstDayOfWeek());
    this.weekDays = [...new Array(7)].map((item, index) => {
      const nextDay = first.getDate() + index;
      return new Date(first.getFullYear(), first.getMonth(), nextDay);
    });
  }

  /**
   * returns first day of the week, it can be 1 if week starts from monday
   * and 0 if from sunday and so on.
   * */
  getFirstDayOfWeek() {
    // TODO: locale-dependent
    return 0;
  }

  getMonthName(date, style = 'long') {
    return date.toLocaleString(this.locale, { month: style });
  }

  getDayOfWeekNames(style = 'narrow') {
    return this.weekDays.map(date => {
      const options = { weekday: style };
      return date.toLocaleString(this.locale, options);
    });
  }
}

export default new CalendarLocale('en-US');
