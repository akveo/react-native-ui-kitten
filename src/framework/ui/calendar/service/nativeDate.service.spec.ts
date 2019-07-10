/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { DateService } from './date.service';
import { NativeDateService } from './nativeDate.service';
import { I18n } from './i18n';

describe('@native-date: service checks', () => {
  let dateService: DateService<Date> = new NativeDateService();

  const i18n: I18n = {
    ru: {
      dayNames: {
        short: [
          'Вc',
          'Пн',
          'Вт',
          'Ср',
          'Чт',
          'Пт',
          'Сб',
        ],
      },
      monthNames: {
        short: [
          'Янв',
          'Фев',
          'Март',
          'Апр',
          'Май',
          'Июнь',
          'Июль',
          'Авг',
          'Сен',
          'Окт',
          'Ноя',
          'Дек',
        ],
      },
    },
  };

  beforeEach(() => {
    dateService = new NativeDateService('en');
  });

  it('* should set locale to jp', () => {
    dateService.setLocale('jp');
    expect((<any>dateService).locale).toBe('jp');
  });

  it('* should validate as correct if date string is valid according to the format', () => {
    const isValid = dateService.isValidDateString('04.23.2018', 'MM.DD.YYYY');
    expect(isValid).toBeTruthy();
  });

  it('* should validate as incorrect if date string is invalid according to the format', () => {
    const isValid = dateService.isValidDateString('23.04.2018', 'MM.DD.YYYY');
    expect(isValid).toBeFalsy();
  });

  it('* should validate as incorrect if date string is completely incorrect', () => {
    const isValid = dateService.isValidDateString('hello, it is a date string', 'MM.DD.YYYY');
    expect(isValid).toBeFalsy();
  });

  it('* should create today date', () => {
    const today = dateService.today();
    expect(dateService.isSameDay(today, new Date())).toBeTruthy();
  });

  it('* should get date', () => {
    const date = new Date(2018, 11, 15);
    expect(dateService.getDate(date)).toBe(15);
  });

  it('* should get month', () => {
    const month = new Date(2018, 5, 15);
    expect(dateService.getMonth(month)).toBe(5);
  });

  it('* should get year', () => {
    const year = new Date(2018, 5, 15);
    expect(dateService.getYear(year)).toBe(2018);
  });

  it('* should get day of week', () => {
    const date = new Date(2018, 8, 17);
    expect(dateService.getDayOfWeek(date)).toBe(1);
  });

  it('* should get first day of week', () => {
    expect(dateService.getFirstDayOfWeek()).toBe(0);
  });

  it('* should get month name', () => {
    const month = new Date(2018, 5, 15);
    expect(dateService.getMonthName(month)).toBe('Jun');
  });

  it('* should get i18n month name', () => {
    dateService = new NativeDateService('ru', i18n);
    const month = new Date(2018, 5, 15);
    expect(dateService.getMonthName(month, 'short')).toBe('Июнь');
  });

  it('* should fallback to default month name', () => {
    dateService = new NativeDateService('ru', i18n);
    const month = new Date(2018, 5, 15);
    jest.spyOn(console, 'warn');
    expect(dateService.getMonthName(month, 'long')).toBe('June');
  });

  it('* should get month name by index', () => {
    expect(dateService.getMonthNameByIndex(5)).toBe('Jun');
  });

  it('* should get day of week names', () => {
    expect(dateService.getDayOfWeekNames()).toEqual([
      'S',
      'M',
      'T',
      'W',
      'T',
      'F',
      'S',
    ]);
  });

  it('* should get custom locale day of week names', () => {
    dateService = new NativeDateService('ru', i18n);
    expect(dateService.getDayOfWeekNames('short')).toEqual([
      'Вc',
      'Пн',
      'Вт',
      'Ср',
      'Чт',
      'Пт',
      'Сб',
    ]);
  });

  it('* should fallback to default day of week names', () => {
    dateService = new NativeDateService('ru', i18n);
    jest.spyOn(console, 'warn');
    expect(dateService.getDayOfWeekNames('long')).toEqual([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]);
  });

  it('* should format date according to the MM.dd.yyyy format', () => {
    const date = new Date(2018, 5, 15);
    expect(dateService.format(date, 'mm.dd.yyyy')).toBe('06.15.2018');
  });

  it('* should parse date', () => {
    const date = '06.15.2018';
    expect(dateService.parse(date, '')).toEqual(new Date(2018, 5, 15));
  });

  it('* should get year end', () => {
    const date = new Date(2018, 5, 15);
    expect(dateService.getYearEnd(date)).toEqual(new Date(2018, 11, 31));
  });

  it('* should get year start', () => {
    const date = new Date(2018, 5, 15);
    expect(dateService.getYearStart(date)).toEqual(new Date(2018, 0, 1));
  });

  it('* should get number of days in month', () => {
    expect(dateService.getNumberOfDaysInMonth(new Date(2018, 1, 10))).toBe(28);
    expect(dateService.getNumberOfDaysInMonth(new Date(2018, 0, 10))).toBe(31);
  });

  it('* should get number of days in month in leap year', () => {
    expect(dateService.getNumberOfDaysInMonth(new Date(2016, 1, 10))).toBe(29);
  });

  it('* should add day', () => {
    const newDate = dateService.addDay(new Date(2018, 6, 16), 1);
    expect(newDate.getTime()).toBe(new Date(2018, 6, 17).getTime());
  });

  it('* should add day in the end of the year', () => {
    const newDate = dateService.addDay(new Date(2018, 11, 31), 1);
    expect(newDate.getTime()).toBe(new Date(2019, 0, 1).getTime());
  });

  it('* should add day in the leap year', () => {
    const newDate = dateService.addDay(new Date(2016, 1, 29), 1);
    expect(newDate.getTime()).toBe(new Date(2016, 2, 1).getTime());
  });

  it('* should add month', () => {
    const newDate = dateService.addMonth(new Date(2018, 6, 16), 1);
    expect(newDate.getTime()).toBe(new Date(2018, 7, 16).getTime());
  });

  it('* should add month in the end of the year', () => {
    const newDate = dateService.addMonth(new Date(2018, 11, 16), 1);
    expect(newDate.getTime()).toBe(new Date(2019, 0, 16).getTime());
  });

  it('* should add month if number of days will be less than current date', () => {
    const newDate = dateService.addMonth(new Date(2018, 11, 31), -1);
    expect(newDate.getTime()).toBe(new Date(2018, 10, 30).getTime());
  });

  it('* should add year', () => {
    const newDate = dateService.addYear(new Date(2018, 11, 16), 1);
    expect(newDate.getTime()).toBe(new Date(2019, 11, 16).getTime());
  });

  it('* should create date', () => {
    const date = dateService.createDate(2018, 6, 16);
    expect(date).toEqual(new Date(2018, 6, 16));
  });

  it('* should create date for two digit year', () => {
    const date = dateService.createDate(12, 6, 16);
    expect(dateService.getYear(date)).toBe(12);
    expect(dateService.getMonth(date)).toBe(6);
    expect(dateService.getDate(date)).toBe(16);
  });

  it('* should clone', () => {
    const date = new Date(2018, 6, 16);
    expect(dateService.clone(date).getTime()).toBe(date.getTime());
  });

  it('* should get month start', () => {
    const date = dateService.getMonthStart(new Date(2018, 6, 16));
    expect(date.getTime()).toBe(new Date(2018, 6, 1).getTime());
  });

  it('* should compare years correctly', () => {
    expect(dateService.isSameYear(new Date(2018, 0), new Date(2018, 6))).toBeTruthy();
    expect(dateService.isSameYear(new Date(2018, 0), new Date(666, 6))).toBeFalsy();
  });

  it('* should compare months correctly', () => {
    expect(dateService.isSameMonth(new Date(2018, 6), new Date(2018, 6))).toBeTruthy();
    expect(dateService.isSameMonth(new Date(2018, 0), new Date(2018, 6))).toBeFalsy();
  });

  it('* should compare days correctly', () => {
    expect(dateService.isSameDay(new Date(2018, 6, 16), new Date(2018, 6, 16))).toBeTruthy();
    expect(dateService.isSameDay(new Date(2018, 7, 16), new Date(2018, 6, 16))).toBeFalsy();
  });

  it('* should compare dates correctly', () => {
    expect(dateService.compareDates(new Date(2018, 6, 16), new Date(2017, 2, 14))).toBeGreaterThan(0);
    expect(dateService.compareDates(new Date(2018, 6, 16), new Date(2019, 2, 14))).toBeLessThan(0);
    expect(dateService.compareDates(new Date(2018, 6, 16), new Date(2018, 6, 16))).toBe(0);
  });
});
