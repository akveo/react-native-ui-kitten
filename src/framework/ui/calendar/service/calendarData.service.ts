/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { DateService } from './date.service';
import {
  batch,
  range,
} from './helpers';

export class CalendarDataService<D> {

  constructor(protected dateService: DateService<D>) {
  }

  public createDayPickerData = (date: D, boundingMonth: boolean): D[][] => {
    const weeks: D[][] = this.createDates(date);

    return this.withBoundingMonths(weeks, date, boundingMonth);
  };

  public createMonthPickerData = (date: D, rows: number, columns: number): D[][] => {
    const yearStart: D = this.dateService.getYearStart(date);
    const monthRange: D[] = range(rows * columns, (index: number): D => {
      return this.dateService.addMonth(yearStart, index);
    });

    return batch(monthRange, rows);
  };

  public createYearPickerData = (date: D, rows: number, columns: number): D[][] => {
    const yearStart: D = this.dateService.getYearStart(date);
    const yearRange: D[] = range(rows * columns, (index: number): D => {
      return this.dateService.addYear(yearStart, index);
    });

    return batch(yearRange, rows);
  };

  public createDayPickerPagerData = (startDate: D, endDate: D): D[] => {
    const numberOfDayPickers: number = this.getNumberOfMonths(startDate, endDate) + 1;

    return range(numberOfDayPickers, (index: number): D => {
      return this.dateService.addMonth(startDate, index);
    });
  };

  public createYearPickerPagerData = (startDate: D, endDate: D, rows: number, columns: number): D[] => {
    const numberOfYears: number = this.getNumberOfYears(startDate, endDate) + 1;
    const numberOfYearPickers: number = Math.max(Math.ceil(numberOfYears / (rows * columns)), 1);

    return range(numberOfYearPickers, (index: number) => {
      return this.dateService.addYear(startDate, index * rows * columns);
    });
  };

  public getNumberOfMonths = (lhs: D, rhs: D): number => {
    const numberOfYears: number = this.getNumberOfYears(lhs, rhs);
    const numberOfMonths: number = this.dateService.getMonth(rhs) - this.dateService.getMonth(lhs);

    return numberOfMonths + numberOfYears * DateService.MONTHS_IN_YEAR;
  };

  public getNumberOfYears = (lhs: D, rhs: D): number => {
    return this.dateService.getYear(rhs) - this.dateService.getYear(lhs);
  };

  private createDates(activeMonth: D): D[][] {
    const days = this.createDateRangeForMonth(activeMonth);
    const startOfWeekDayDiff = this.getStartOfWeekDayDiff(activeMonth);

    return batch(days, DateService.DAYS_IN_WEEK, startOfWeekDayDiff);
  }

  private withBoundingMonths(weeks: D[][], activeMonth: D, boundingMonth: boolean): D[][] {
    let withBoundingMonths = weeks;

    if (this.isShouldAddPrevBoundingMonth(withBoundingMonths)) {
      withBoundingMonths = this.addPrevBoundingMonth(withBoundingMonths, activeMonth, boundingMonth);
    }

    if (this.isShouldAddNextBoundingMonth(withBoundingMonths)) {
      withBoundingMonths = this.addNextBoundingMonth(withBoundingMonths, activeMonth, boundingMonth);
    }

    return withBoundingMonths;
  }

  private addPrevBoundingMonth(weeks: D[][], activeMonth: D, boundingMonth: boolean): D[][] {
    const firstWeek: D[] = weeks.shift();
    const requiredItems: number = DateService.DAYS_IN_WEEK - firstWeek.length;
    firstWeek.unshift(...this.createPrevBoundingDays(activeMonth, boundingMonth, requiredItems));

    return [firstWeek, ...weeks];
  }

  private addNextBoundingMonth(weeks: D[][], activeMonth: D, boundingMonth: boolean): D[][] {
    const lastWeek: D[] = weeks.pop();
    const requiredItems: number = DateService.DAYS_IN_WEEK - lastWeek.length;
    lastWeek.push(...this.createNextBoundingDays(activeMonth, boundingMonth, requiredItems));

    return [...weeks, lastWeek];
  }

  private createPrevBoundingDays(activeMonth: D, boundingMonth: boolean, requiredItems: number): D[] {
    const month: D = this.dateService.addMonth(activeMonth, -1);
    const daysInMonth: number = this.dateService.getNumberOfDaysInMonth(month);

    return this.createDateRangeForMonth(month)
               .slice(daysInMonth - requiredItems)
               .map(date => boundingMonth ? date : null);
  }

  private createNextBoundingDays(activeMonth: D, boundingMonth: boolean, requiredItems: number): D[] {
    const month: D = this.dateService.addMonth(activeMonth, 1);

    return this.createDateRangeForMonth(month)
               .slice(0, requiredItems)
               .map((date: D): D => boundingMonth ? date : null);
  }

  private getStartOfWeekDayDiff(date: D): number {
    const startOfMonth: D = this.dateService.getMonthStart(date);

    return this.getWeekStartDiff(startOfMonth);
  }

  private getWeekStartDiff(date: D): number {
    return (
      DateService.DAYS_IN_WEEK
      - this.dateService.getFirstDayOfWeek()
      + this.dateService.getDayOfWeek(date)
    ) % DateService.DAYS_IN_WEEK;
  }

  private isShouldAddPrevBoundingMonth(weeks: D[][]): boolean {
    return weeks[0].length < DateService.DAYS_IN_WEEK;
  }

  private isShouldAddNextBoundingMonth(weeks: D[][]): boolean {
    return weeks[weeks.length - 1].length < DateService.DAYS_IN_WEEK;
  }

  private createDateRangeForMonth(date: D): D[] {
    const daysInMonth: number = this.dateService.getNumberOfDaysInMonth(date);

    return range(daysInMonth, (i: number) => {
      const year = this.dateService.getYear(date);
      const month = this.dateService.getMonth(date);

      return this.dateService.createDate(year, month, i + 1);
    });
  }
}
