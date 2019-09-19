import { DateService } from './date.service';
import {
  CalendarDateInfo,
  CalendarRange,
} from '../type';

export class RangeDateService<D> {

  private dateService: DateService<D>;

  constructor(dateService: DateService<D>) {
    this.dateService = dateService;
  }

  public createRange(range: CalendarRange<D>, date: CalendarDateInfo<D>): CalendarRange<D> {
    switch (true) {
      case (!range.startDate && !range.endDate):
        return { startDate: date.date, endDate: null };
      case (range.startDate && !range.endDate):
        return this.createRangeForStart(range, date);
      case (range.startDate !== null && range.endDate !== null):
        return this.createRangeForStartEnd(range, date);
      default:
        return range;
    }
  }

  private createRangeForStart(range: CalendarRange<D>, date: CalendarDateInfo<D>): CalendarRange<D> {
    if (this.dateService.compareDatesSafe(range.startDate, date.date) === 1) {
      return { startDate: date.date, endDate: range.endDate };
    } else {
      return { startDate: range.startDate, endDate: date.date };
    }
  }

  private createRangeForStartEnd(range: CalendarRange<D>, date: CalendarDateInfo<D>): CalendarRange<D> {
    if (this.dateService.compareDatesSafe(date.date, range.startDate) === -1 &&
      this.dateService.compareDatesSafe(date.date, range.endDate) === -1) {
      return { startDate: date.date, endDate: range.endDate };
    } else if (this.dateService.compareDatesSafe(date.date, range.startDate) === 1 &&
      this.dateService.compareDatesSafe(date.date, range.endDate) === 1) {
      return { startDate: range.startDate, endDate: date.date };
    } else if (this.dateService.isBetween(date.date, range.startDate, range.endDate)) {
      return { startDate: range.startDate, endDate: date.date };
    } else {
      return range;
    }
  }
}
