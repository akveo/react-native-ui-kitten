/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { RangeDateService } from './rangeDate.service';
import { NativeDateService } from './nativeDate.service';
import { CalendarRange } from '../type';

describe('@range service checks', () => {

  let rangeService: RangeDateService<Date>;

  const initialRange: CalendarRange<Date> = {
    startDate: null,
    endDate: null,
  };

  beforeEach(() => {
    rangeService = new RangeDateService(new NativeDateService());
  });

  it('* should create range without end date', () => {
    const startDate = new Date(2019, 8, 12);
    const range: CalendarRange<Date> = rangeService.createRange(initialRange, startDate);

    expect(range).toStrictEqual({ startDate, endDate: null });
  });

  it('* should create range with end date after select', () => {
    const startDate = new Date(2019, 8, 12);
    const endDate = new Date(2019, 8, 24);

    let range: CalendarRange<Date> = rangeService.createRange(initialRange, startDate);
    range = rangeService.createRange(range, endDate);

    expect(range).toStrictEqual({ startDate, endDate });
  });

  it('* should create range with start date after re-select', () => {
    const startDate = new Date(2019, 8, 12);
    const endDate = new Date(2019, 8, 24);
    const updatedStartDate = new Date(2019, 8, 19);

    let range: CalendarRange<Date> = rangeService.createRange(initialRange, startDate);
    range = rangeService.createRange(range, endDate);
    range = rangeService.createRange(range, updatedStartDate);

    expect(range).toStrictEqual({ startDate: updatedStartDate, endDate: null });
  });

  it('* should create range with start and end date after re-select', () => {
    const startDate = new Date(2019, 8, 12);
    const endDate = new Date(2019, 8, 13);
    const updatedStartDate = new Date(2019, 8, 10);
    const updatedEndDate = new Date(2019, 8, 11);

    let range: CalendarRange<Date> = rangeService.createRange(initialRange, startDate);
    range = rangeService.createRange(range, endDate);
    range = rangeService.createRange(range, updatedStartDate);
    range = rangeService.createRange(range, updatedEndDate);

    expect(range).toStrictEqual({ startDate: updatedStartDate, endDate: updatedEndDate });
  });

});
