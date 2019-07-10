/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import merge from 'lodash.merge';
import dateFormat from 'dateformat';
import { DateService } from './date.service';
import {
  I18n,
  NativeDateI18n,
} from './i18n';
import { LOCALE_EN } from './locale';

const FIRST_DAY_OF_WEEK: number = 0;

const LOCALE_DEFAULT: string = 'en';

const I18N_DEFAULT: I18n = {
  [LOCALE_DEFAULT]: LOCALE_EN,
};

/**
 * The `NativeDateService` is basic implementation of `DateService` using
 * native js date objects.
 * */
export class NativeDateService extends DateService<Date> {

  private readonly i18n: I18n;

  constructor(locale: string = LOCALE_DEFAULT, i18n?: I18n) {
    super();
    this.i18n = merge({}, I18N_DEFAULT, i18n);
    this.setLocale(locale);
  }

  public setLocale(locale: string) {
    super.setLocale(locale);
  }

  public isValidDateString(date: string, format: string): boolean {
    return !isNaN(this.parse(date, format).getTime());
  }

  public today(): Date {
    return new Date();
  }

  public getDate(date: Date): number {
    return date.getDate();
  }

  public getMonth(date: Date): number {
    return date.getMonth();
  }

  public getYear(date: Date): number {
    return date.getFullYear();
  }

  public getDayOfWeek(date: Date): number {
    return date.getDay();
  }

  /**
   * returns first day of the week, it can be 1 if week starts from monday
   * and 0 if from sunday and so on.
   * */
  public getFirstDayOfWeek(): number {
    return FIRST_DAY_OF_WEEK;
  }

  public getMonthName(date: Date, style: string = 'short'): string {
    const index: number = date.getMonth();

    return this.getMonthNameByIndex(index, style);
  }

  public getMonthNameByIndex(index: number, style: string = 'short'): string {
    return this.getLocaleMonthNameByIndex(this.locale, index, style);
  }

  public getDayOfWeekNames(style: string = 'narrow'): string[] {
    return this.getLocaleDayOfWeekNames(this.locale, style);
  }

  public format(date: Date, format: string): string {
    return dateFormat(date, format);
  }

  /**
   * We haven't got capability to parse date using formatting without third party libraries.
   * */
  public parse(date: string, format: string): Date {
    return new Date(Date.parse(date));
  }

  public addDay(date: Date, num: number): Date {
    return this.createDate(date.getFullYear(), date.getMonth(), date.getDate() + num);
  }

  public addMonth(date: Date, num: number): Date {
    const month = this.createDate(date.getFullYear(), date.getMonth() + num, 1);

    // In case of date has more days than calculated month js Date will change that month to the next one
    // because of the date overflow.
    month.setDate(Math.min(date.getDate(), this.getMonthEnd(month).getDate()));

    return month;
  }

  public addYear(date: Date, num: number): Date {
    return this.createDate(date.getFullYear() + num, date.getMonth(), date.getDate());
  }

  public clone(date: Date): Date {
    return new Date(date.getTime());
  }

  public compareDates(date1: Date, date2: Date): number {
    return date1.getTime() - date2.getTime();
  }

  public createDate(year: number, month: number, date: number): Date {
    const result = new Date(year, month, date);

    // We need to correct for the fact that JS native Date treats years in range [0, 99] as
    // abbreviations for 19xx.
    if (year >= 0 && year < 100) {
      result.setFullYear(result.getFullYear() - 1900);
    }

    return result;
  }

  public getMonthEnd(date: Date): Date {
    return this.createDate(date.getFullYear(), date.getMonth() + 1, 0);
  }

  public getMonthStart(date: Date): Date {
    return this.createDate(date.getFullYear(), date.getMonth(), 1);
  }

  public getNumberOfDaysInMonth(date: Date): number {
    return this.getMonthEnd(date).getDate();
  }

  public getYearEnd(date: Date): Date {
    return this.createDate(date.getFullYear(), 11, 31);
  }

  public getYearStart(date: Date): Date {
    return this.createDate(date.getFullYear(), 0, 1);
  }

  public isSameDay(date1: Date, date2: Date): boolean {
    return this.isSameMonth(date1, date2) && date1.getDate() === date2.getDate();
  }

  public isSameMonth(date1: Date, date2: Date): boolean {
    return this.isSameYear(date1, date2) && date1.getMonth() === date2.getMonth();
  }

  public isSameYear(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear();
  }

  public getId(): string {
    return 'native';
  }

  private getLocaleMonthNameByIndex(locale: string, index: number, style: string = 'short'): string {
    const i18n: NativeDateI18n = this.i18n[locale];
    const monthNames: string[] = i18n && i18n.monthNames && i18n.monthNames[style];

    return (monthNames && monthNames[index]) || this.getLocaleMonthNameByIndex(LOCALE_DEFAULT, index, style);
  }

  private getLocaleDayOfWeekNames(locale: string, style: string = 'narrow'): string[] {
    const i18n: NativeDateI18n = this.i18n[locale];
    const dayNames: string[] = i18n && i18n.dayNames && i18n.dayNames[style];

    return dayNames || this.getLocaleDayOfWeekNames(LOCALE_DEFAULT, style);
  }
}
