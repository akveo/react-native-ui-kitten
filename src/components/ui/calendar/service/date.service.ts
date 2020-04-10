/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { TranslationWidth } from '../i18n/type';

export abstract class DateService<D> {
  static DAYS_IN_WEEK: number = 7;
  static MONTHS_IN_YEAR: number = 12;

  protected locale: string;

  public setLocale(locale: any) {
    this.locale = locale;
  }

  public compareDatesSafe(date1: D, date2: D): number {
    if (date1 && date2) {
      return this.compareDates(date1, date2);
    } else if (!date1 && !date2) {
      return 0;
    }
    return -1;
  }

  /**
   * Checks if the date is between the start date and the end date.
   * */
  public isBetween(date: D, start: D, end: D): boolean {
    return this.compareDates(date, start) > 0 && this.compareDates(date, end) < 0;
  }

  /**
   * Checks if the date is between the start date and the end date.
   * */
  public isBetweenSafe(date: D, start: D, end: D): boolean {
    return date && start && end && this.compareDates(date, start) > 0 && this.compareDates(date, end) < 0;
  }

  /**
   * Checks if the date is between the start date and the end date including bounds.
   * */
  public isBetweenIncluding(date: D, start: D, end: D): boolean {
    return this.compareDates(date, start) >= 0 && this.compareDates(date, end) <= 0;
  }

  /**
   * Checks if the date is between the start date and the end date including bounds.
   * */
  public isBetweenIncludingSafe(date: D, start: D, end: D): boolean {
    return date && start && end && this.isBetweenIncluding(date, start, end);
  }

  /**
   * Checks is two dates have the same day.
   * */
  public isSameDaySafe(date1: D, date2: D): boolean {
    return date1 && date2 && this.isSameDay(date1, date2);
  }

  /**
   * Checks is two dates have the same month.
   * */
  public isSameMonthSafe(date1: D, date2: D): boolean {
    return date1 && date2 && this.isSameMonth(date1, date2);
  }

  /**
   * Checks is two dates have the same year.
   * */
  public isSameYearSafe(date1: D, date2: D): boolean {
    return date1 && date2 && this.isSameYear(date1, date2);
  }

  /**
   * Returns true if date string is valid date string according to the provided format.
   * */
  public abstract isValidDateString(date: string, format: string): boolean;

  /**
   * Returns today date.
   * */
  public abstract today(): D;

  /**
   * Gets the date of the month component of the given date.
   */
  public abstract getDate(date: D): number;

  /**
   * Gets the month component of the given date.
   * */
  public abstract getMonth(date: D): number;

  /**
   * Gets the year component of the given date.
   * */
  public abstract getYear(date: D): number;

  /**
   * Returns day of the week of the given date.
   */
  public abstract getDayOfWeek(date: D): number;

  /**
   * Returns first day of the week, it can be 1 if week starts from monday
   * and 0 if from sunday and so on.
   * */
  public abstract getFirstDayOfWeek(): number;

  /**
   * Returns localized month name by date and style.
   * */
  public abstract getMonthName(date: D, style?: TranslationWidth): string;

  /**
   * Returns localized month name by month index and style.
   * */
  public abstract getMonthNameByIndex(month: number, style?: TranslationWidth): string;

  /**
   * Returns localized days names.
   * */
  public abstract getDayOfWeekNames(style?: TranslationWidth): string[];

  /**
   * Parses the date string according to the passed format.
   * */
  public abstract parse(date: string, format: string): D;

  /**
   * Transforms the date to the string according to the passed format.
   * */
  public abstract format(date: D, format: string): string;

  /**
   * Creates new date from year, month and date.
   * */
  public abstract createDate(year: number, month: number, date: number): D;

  /**
   * Checks is two dates have the same year.
   * */
  public abstract isSameYear(date1: D, date2: D): boolean;

  /**
   * Checks is two dates have the same month.
   * */
  public abstract isSameMonth(date1: D, date2: D): boolean;

  /**
   * Checks is two dates have the same day.
   * */
  public abstract isSameDay(date1: D, date2: D): boolean;

  /**
   * Compares two dates.
   * Returns 0 if dates are the same.
   * Returns 1 if the first date is greater than the second.
   * Returns -1 if the second date is greater than the first.
   * */
  public abstract compareDates(date1: D, date2: D): number;

  /**
   * Clones passed date.
   * */
  public abstract clone(date: D): D;

  /**
   * Creates the same date but with day equals to 1.
   * */
  public abstract getMonthStart(date: D): D;

  /**
   * Creates the same date but with day equals to the last day in this month.
   * */
  public abstract getMonthEnd(date: D): D;

  /**
   * Creates the same date but with month equals to 0 and day equals to 1.
   * */
  public abstract getYearStart(date: D): D;

  /**
   * Creates the same date but with month equals to 11 and day equals to 31.
   * */
  public abstract getYearEnd(date: D): D;

  /**
   * Returns number of days in the date.
   * */
  public abstract getNumberOfDaysInMonth(date: D): number;

  /**
   * Returns date with added number of days.
   * */
  public abstract addDay(date: D, days: number): D;

  /**
   * Returns date with added number of months.
   * */
  public abstract addMonth(date: D, months: number): D;

  /**
   * Returns date with added number of years.
   * */
  public abstract addYear(date: D, years: number): D;

  public abstract getId(): string;
}
