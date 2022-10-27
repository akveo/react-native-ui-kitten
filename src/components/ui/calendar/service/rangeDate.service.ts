/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { DateService } from './date.service';
import { CalendarRange } from '../type';

export class RangeDateService<D> {

  private dateService: DateService<D>;

  constructor(dateService: DateService<D>) {
    this.dateService = dateService;
  }

  public createRange(range: CalendarRange<D>, date: D): CalendarRange<D> {
    switch (true) {
      case (!range.startDate && !range.endDate):
        return { startDate: date, endDate: null };
      case (range.startDate && !range.endDate):
        return this.createRangeForStart(range, date);
      case (range.startDate !== null && range.endDate !== null):
        return this.createRangeForStartEnd(date);
      default:
        return range;
    }
  }

  private createRangeForStart(range: CalendarRange<D>, date: D): CalendarRange<D> {
    if (this.dateService.compareDatesSafe(date, range.startDate) === -1) {
      // startDate < date
      return { startDate: date, endDate: range.startDate };
    } else {
      // startDate >= date
      return { startDate: range.startDate ?? date, endDate: date };
    }
  }

  private createRangeForStartEnd(date: D): CalendarRange<D> {
    return { startDate: date, endDate: null };
  }
}
