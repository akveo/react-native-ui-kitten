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

export class MonthModelService<D> {

  constructor(protected dateService: DateService<D>) {
  }

  public createDaysGrid(activeMonth: D, boundingMonth: boolean = true): D[][] {
    const weeks: D[][] = this.createDates(activeMonth);

    return this.withBoundingMonths(weeks, activeMonth, boundingMonth);
  }

  public getNumberOfWeekRowsInMonth(activeMonth: D): number {
    const startOfWeekDayDiff: number = this.getStartOfWeekDayDiff(activeMonth);
    const numberOfDays: number = this.dateService.getNumberOfDaysInMonth(activeMonth);

    return Math.ceil((startOfWeekDayDiff + numberOfDays) / DateService.DAYS_IN_WEEK);
  }

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
