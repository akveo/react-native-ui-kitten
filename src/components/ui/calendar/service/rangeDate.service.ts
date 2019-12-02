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
        return this.createRangeForStartEnd(date);
      default:
        return range;
    }
  }

  private createRangeForStart(range: CalendarRange<D>, date: CalendarDateInfo<D>): CalendarRange<D> {
    if (this.dateService.compareDatesSafe(date.date, range.startDate) === 1) {
      return { startDate: range.startDate, endDate: date.date };
    } else if (this.dateService.compareDatesSafe(date.date, range.startDate) === -1) {
      return { startDate: date.date, endDate: range.startDate };
    } else {
      return range;
    }
  }

  private createRangeForStartEnd(date: CalendarDateInfo<D>): CalendarRange<D> {
    return { startDate: date.date, endDate: null};
  }
}
