import { RangeService } from './range.service';
import { NativeDateService } from './nativeDate.service';
import {
  CalendarDateInfo,
  CalendarRange,
} from '../type';

describe('@range service checks', () => {

  let rangeService: RangeService<Date>;

  const initialRange: CalendarRange<Date> = {
    startDate: null,
    endDate: null,
  };

  beforeEach(() => {
    rangeService = new RangeService(new NativeDateService());
  });

  it('* getRange checks 1', () => {
    const expectedRange: CalendarRange<Date> = {
      startDate: new Date(Date.UTC(2019, 8, 12)),
      endDate: null,
    };
    const date: CalendarDateInfo<Date> = {
      date: new Date(Date.UTC(2019, 8, 12)),
      bounding: false,
      holiday: false,
    };
    const range: CalendarRange<Date> = rangeService.getRange(initialRange, date);

    expect(range).toStrictEqual(expectedRange);
  });

  it('* getRange checks 2', () => {
    const expectedRange: CalendarRange<Date> = {
      startDate: new Date(Date.UTC(2019, 8, 12)),
      endDate: new Date(Date.UTC(2019, 8, 24)),
    };
    const date1: CalendarDateInfo<Date> = {
      date: new Date(Date.UTC(2019, 8, 12)),
      bounding: false,
      holiday: false,
    };
    const date2: CalendarDateInfo<Date> = {
      date: new Date(Date.UTC(2019, 8, 24)),
      bounding: false,
      holiday: false,
    };
    let range: CalendarRange<Date> = rangeService.getRange(initialRange, date1);
    range = rangeService.getRange(range, date2);

    expect(range).toStrictEqual(expectedRange);
  });

  it('* getRange checks 3', () => {
    const expectedRange: CalendarRange<Date> = {
      startDate: new Date(Date.UTC(2019, 8, 12)),
      endDate: new Date(Date.UTC(2019, 8, 19)),
    };
    const date1: CalendarDateInfo<Date> = {
      date: new Date(Date.UTC(2019, 8, 12)),
      bounding: false,
      holiday: false,
    };
    const date2: CalendarDateInfo<Date> = {
      date: new Date(Date.UTC(2019, 8, 24)),
      bounding: false,
      holiday: false,
    };
    const date3: CalendarDateInfo<Date> = {
      date: new Date(Date.UTC(2019, 8, 19)),
      bounding: false,
      holiday: false,
    };
    let range: CalendarRange<Date> = rangeService.getRange(initialRange, date1);
    range = rangeService.getRange(range, date2);
    range = rangeService.getRange(range, date3);

    expect(range).toStrictEqual(expectedRange);
  });

  it('* getRange checks 4', () => {
    const expectedRange: CalendarRange<Date> = {
      startDate: new Date(Date.UTC(2019, 8, 10)),
      endDate: new Date(Date.UTC(2019, 8, 24)),
    };
    const date1: CalendarDateInfo<Date> = {
      date: new Date(Date.UTC(2019, 8, 12)),
      bounding: false,
      holiday: false,
    };
    const date2: CalendarDateInfo<Date> = {
      date: new Date(Date.UTC(2019, 8, 24)),
      bounding: false,
      holiday: false,
    };
    const date3: CalendarDateInfo<Date> = {
      date: new Date(Date.UTC(2019, 8, 10)),
      bounding: false,
      holiday: false,
    };
    let range: CalendarRange<Date> = rangeService.getRange(initialRange, date1);
    range = rangeService.getRange(range, date2);
    range = rangeService.getRange(range, date3);

    expect(range).toStrictEqual(expectedRange);
  });

  it('* getRange checks 5', () => {
    const expectedRange: CalendarRange<Date> = {
      startDate: new Date(Date.UTC(2019, 8, 12)),
      endDate: new Date(Date.UTC(2019, 8, 14)),
    };
    const date1: CalendarDateInfo<Date> = {
      date: new Date(Date.UTC(2019, 8, 12)),
      bounding: false,
      holiday: false,
    };
    const date2: CalendarDateInfo<Date> = {
      date: new Date(Date.UTC(2019, 8, 24)),
      bounding: false,
      holiday: false,
    };
    const date3: CalendarDateInfo<Date> = {
      date: new Date(Date.UTC(2019, 8, 14)),
      bounding: false,
      holiday: false,
    };
    let range: CalendarRange<Date> = rangeService.getRange(initialRange, date1);
    range = rangeService.getRange(range, date2);
    range = rangeService.getRange(range, date3);

    expect(range).toStrictEqual(expectedRange);
  });

});
