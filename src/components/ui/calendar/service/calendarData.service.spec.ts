/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  CalendarDataService,
  DateBatch,
  DateRange,
} from './calendarData.service';
import { DateService } from './date.service';
import { NativeDateService } from './nativeDate.service';
import { CalendarDateInfo } from '../type';

describe('@month-model: service checks', () => {
  const dateService: DateService<Date> = new NativeDateService('en-US');
  const dataService: CalendarDataService<Date> = new CalendarDataService(dateService);

  it('* should create day picker data with active month', () => {
    const date = new Date(2018, 7, 1);
    const grid: DateRange<Date>[] = dataService.createDayPickerData(date);
    expect(grid.length).toBe(5);
    grid.forEach((row: CalendarDateInfo<Date>[]) => {
      expect(row.length).toBe(7);
    });
  });

  it('* should create day picker data with boundingMonth', () => {
    const date = new Date(2018, 7, 1);
    const grid: DateRange<Date>[] = dataService.createDayPickerData(date);
    const firstBounds: CalendarDateInfo<Date>[] = grid.shift().slice(0, 3);
    const lastBounds: CalendarDateInfo<Date>[] = grid.pop().slice(6);

    firstBounds.forEach((cell: CalendarDateInfo<Date>) => {
      expect(cell.bounding).toBe(true);
    });

    lastBounds.forEach((cell: CalendarDateInfo<Date>) => {
      expect(cell.bounding).toBe(true);
    });
  });

  it('* should create month picker data', () => {
    const date: Date = new Date(2019, 7, 1);

    const monthPickerData: DateBatch<Date> = dataService.createMonthPickerData(date, 4, 3);
    expect(monthPickerData.length).toEqual(3);
    monthPickerData.forEach((monthRange: CalendarDateInfo<Date>[], row: number) => {
      expect(monthRange[0].date.getMonth()).toEqual(row * 4);
      expect(monthRange.length).toEqual(4);
      monthRange.forEach((monthDate: CalendarDateInfo<Date>, column: number) => {
        expect(monthDate.date.getMonth()).toEqual(monthRange[0].date.getMonth() + column);
      });
    });
  });

  it('* should create year picker data', () => {
    const start: Date = new Date(2019, 7, 1);

    const yearPickerData: DateBatch<Date> = dataService.createYearPickerData(start, 4, 3);

    expect(yearPickerData.length).toEqual(3);
    yearPickerData.forEach((yearRange: CalendarDateInfo<Date>[], row: number) => {
      expect(yearRange[0].date.getFullYear()).toEqual(start.getFullYear() + row * 4);
      expect(yearRange.length).toEqual(4);
      yearRange.forEach((yearDate: CalendarDateInfo<Date>, column: number) => {
        expect(yearDate.date.getFullYear()).toEqual(yearRange[0].date.getFullYear() + column);
      });
    });
  });

  it('* should create year picker pager data', () => {
    const start: Date = new Date(2019, 6, 1);
    const end: Date = new Date(2019, 8, 1);

    const yearPickerPagerData: CalendarDateInfo<Date>[] = dataService
      .createYearPickerPagerData(start, end, 4, 3);

    yearPickerPagerData.forEach((pageDate: CalendarDateInfo<Date>, index: number) => {
      expect(pageDate.date.getFullYear()).toEqual(start.getFullYear() + index * 4 * 3);
    });
  });

  it('* should create day picker pager data', () => {
    const start: Date = new Date(2019, 6, 1);
    const end: Date = new Date(2019, 8, 1);

    const dayPickerPagerData: CalendarDateInfo<Date>[] = dataService.createDayPickerPagerData(start, end);

    dayPickerPagerData.forEach((pageDate: CalendarDateInfo<Date>, index: number) => {
      expect(pageDate.date.getMonth()).toEqual(start.getMonth() + index);
    });

    expect(dayPickerPagerData.length).toEqual(3);
  });

  it('* calculates number of months properly', () => {
    const start: Date = new Date(2019, 7, 1);
    const end: Date = new Date(2020, 7, 1);

    const numberOfMonths: number = dataService.getNumberOfMonths(start, end);

    expect(numberOfMonths).toEqual(12);
  });

  it('* calculates number of years properly', () => {
    const start: Date = new Date(2019, 7, 15);
    const end: Date = new Date(2020, 7, 15);

    const numberOfYears: number = dataService.getNumberOfYears(start, end);

    expect(numberOfYears).toEqual(1);
  });

});
