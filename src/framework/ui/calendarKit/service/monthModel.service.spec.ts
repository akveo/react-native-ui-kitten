/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */


import { MonthModelService } from './monthModel.service';
import { DateService } from './date.service';
import { NativeDateService } from './nativeDate.service';

describe('@month-model: service checks', () => {
  const dateService: DateService<Date> = new NativeDateService('en-US');
  const monthModelService: MonthModelService<Date> = new MonthModelService(dateService);

  it('* should create days grid with active month', () => {
    const date = new Date(2018, 7, 1);
    const grid: Date[][] = monthModelService.createDaysGrid(date);
    expect(grid.length).toBe(5);
    grid.forEach((row: Date[]) => {
      expect(row.length).toBe(7);
    });
  });

  it('* should create days grid without boundingMonth', () => {
    const date = new Date(2018, 7, 1);
    const grid: Date[][] = monthModelService.createDaysGrid(date, false);
    const firstTwoEmpty = grid.shift().slice(0, 3);
    const lastTwoEmpty = grid.pop().slice(6);
    firstTwoEmpty.forEach(cell => {
      expect(cell).toBeNull();
    });
    lastTwoEmpty.forEach(cell => {
      expect(cell).toBeNull();
    });
  });

  it('* number of week rows calculated properly', () => {
    const date = new Date(2019, 7, 1);
    const numberOfWeekRowsInMonth: number = monthModelService.getNumberOfWeekRowsInMonth(date);

    expect(numberOfWeekRowsInMonth).toBe(5);
  });
});
