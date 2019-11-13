import { RangeDateService } from './rangeDate.service';
import { NativeDateService } from './nativeDate.service';
import {
  CalendarDateInfo,
  CalendarRange,
} from '../type';

describe('@range service checks', () => {

  let rangeService: RangeDateService<Date>;

  const initialRange: CalendarRange<Date> = {
    startDate: null,
    endDate: null,
  };

  beforeEach(() => {
    rangeService = new RangeDateService(new NativeDateService());
  });

  it('* getRange (only start date)', () => {
    const expectedRange: CalendarRange<Date> = {
      startDate: new Date(2019, 8, 12),
      endDate: null,
    };
    const date: CalendarDateInfo<Date> = {
      date: new Date(2019, 8, 12),
      bounding: false,
      holiday: false,
    };
    const range: CalendarRange<Date> = rangeService.createRange(initialRange, date);

    expect(range).toStrictEqual(expectedRange);
  });

  it('* getRange (full range)', () => {
    const expectedRange: CalendarRange<Date> = {
      startDate: new Date(2019, 8, 12),
      endDate: new Date(2019, 8, 24),
    };
    const date1: CalendarDateInfo<Date> = {
      date: new Date(2019, 8, 12),
      bounding: false,
      holiday: false,
    };
    const date2: CalendarDateInfo<Date> = {
      date: new Date(2019, 8, 24),
      bounding: false,
      holiday: false,
    };
    let range: CalendarRange<Date> = rangeService.createRange(initialRange, date1);
    range = rangeService.createRange(range, date2);

    expect(range).toStrictEqual(expectedRange);
  });

  it('* getRange (re-select with only start date)', () => {
    const expectedRange: CalendarRange<Date> = {
      startDate: new Date(2019, 8, 19),
      endDate: null,
    };
    const date1: CalendarDateInfo<Date> = {
      date: new Date(2019, 8, 12),
      bounding: false,
      holiday: false,
    };
    const date2: CalendarDateInfo<Date> = {
      date: new Date(2019, 8, 24),
      bounding: false,
      holiday: false,
    };
    const date3: CalendarDateInfo<Date> = {
      date: new Date(2019, 8, 19),
      bounding: false,
      holiday: false,
    };
    let range: CalendarRange<Date> = rangeService.createRange(initialRange, date1);
    range = rangeService.createRange(range, date2);
    range = rangeService.createRange(range, date3);

    expect(range).toStrictEqual(expectedRange);
  });

  it('* getRange (re-select with full range)', () => {
    const expectedRange: CalendarRange<Date> = {
      startDate: new Date(2019, 8, 10),
      endDate: new Date(2019, 8, 13),
    };
    const date1: CalendarDateInfo<Date> = {
      date: new Date(2019, 8, 12),
      bounding: false,
      holiday: false,
    };
    const date2: CalendarDateInfo<Date> = {
      date: new Date(2019, 8, 24),
      bounding: false,
      holiday: false,
    };
    const date3: CalendarDateInfo<Date> = {
      date: new Date(2019, 8, 10),
      bounding: false,
      holiday: false,
    };
    const date4: CalendarDateInfo<Date> = {
      date: new Date(2019, 8, 13),
      bounding: false,
      holiday: false,
    };
    let range: CalendarRange<Date> = rangeService.createRange(initialRange, date1);
    range = rangeService.createRange(range, date2);
    range = rangeService.createRange(range, date3);
    range = rangeService.createRange(range, date4);

    expect(range).toStrictEqual(expectedRange);
  });

});
