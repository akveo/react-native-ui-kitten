/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NativeDateService } from './nativeDate.service';
import {
  I18nConfig,
  TranslationWidth,
} from '../i18n/type';
import { EN } from '../i18n/en';

const i18n: I18nConfig = {
  dayNames: {
    short: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    long: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  },
  monthNames: {
    short: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    long: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  },
};

describe('@native-date: service checks', () => {
  let dateService: NativeDateService;

  beforeEach(() => {
    dateService = new NativeDateService();
  });

  it('* should be initialized with en locale', () => {
    expect((<any>dateService).locale).toBe('en');
  });

  it('* should be initialized with zh locale', () => {
    dateService = new NativeDateService('zh', { i18n });
    expect((<any>dateService).locale).toBe('zh');
  });

  it('* should be initialized with en locale if no i18n', () => {
    dateService = new NativeDateService('zh');
    expect((<any>dateService).locale).toBe('en');
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

  it('* should get custom first day of week if provided', () => {
    dateService = new NativeDateService('en', { startDayOfWeek: 1 });
    expect(dateService.getFirstDayOfWeek()).toBe(1);
  });

  it('* should get month name', () => {
    const month = new Date(2018, 5, 15);
    expect(dateService.getMonthName(month)).toBe('Jun');
  });

  it('* should get i18n month name', () => {
    dateService = new NativeDateService('zh', { i18n });
    const month = new Date(2018, 5, 15);
    expect(dateService.getMonthName(month, TranslationWidth.SHORT)).toBe('6月');
  });

  it('* should get month name by index', () => {
    expect(dateService.getMonthNameByIndex(5)).toBe('Jun');
  });

  it('* should get day of week names', () => {
    expect(dateService.getDayOfWeekNames()).toEqual(EN.dayNames.short);
  });

  it('* should get day of week names', () => {
    const startDayOfWeek = 1;
    dateService = new NativeDateService('en', { startDayOfWeek });

    const { [0]: startDayOfWeekName } = dateService.getDayOfWeekNames();
    expect(startDayOfWeekName).toEqual(EN.dayNames.short[startDayOfWeek]);
  });

  it('* should get i18n day of week names', () => {
    dateService = new NativeDateService('zh', { i18n });
    expect(dateService.getDayOfWeekNames(TranslationWidth.SHORT)).toEqual(i18n.dayNames.short);
  });

  it('* should format date according to the MM.DD.YYYY format', () => {
    const date: Date = new Date(2018, 5, 15);
    expect(dateService.format(date, 'MM.DD.YYYY')).toBe('06.15.2018');
  });

  it('* should parse date', () => {
    const date: string = '06.15.2018';
    expect(dateService.parse(date, '')).toEqual(new Date(2018, 5, 15));
  });

  it('* should get year end', () => {
    const date: Date = new Date(2018, 5, 15);
    expect(dateService.getYearEnd(date)).toEqual(new Date(2018, 11, 31));
  });

  it('* should get year start', () => {
    const date: Date = new Date(2018, 5, 15);
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

  it('compare dates safe works correctly', () => {
    expect(dateService.compareDatesSafe(new Date(2018, 1, 15), new Date(2018, 1, 3)))
      .toBe(1);
    expect(dateService.compareDatesSafe(new Date(2018, 1, 15), new Date(2018, 1, 18)))
      .toBe(-1);
    expect(dateService.compareDatesSafe(new Date(2018, 1, 15), new Date(2018, 1, 15)))
      .toBe(0);
  });

});
