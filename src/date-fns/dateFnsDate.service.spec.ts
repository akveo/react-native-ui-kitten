/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */


import { DateService } from '@ui-kitten/components';
import { DateFnsService } from './dateFnsDate.service';

describe('@date-fns: service checks', () => {
  let dateService: DateService<Date>;

  beforeEach(() => {
    dateService = new DateFnsService('en', null);
  });

  it('* should parse date according to the MM.dd.yyyy format', () => {
    const date = '06.15.2018';
    expect(dateService.parse(date, 'MM.dd.yyyy')).toEqual(new Date(2018, 5, 15));
  });

  it('* should not format if date isn\'t passed', () => {
    expect(() => dateService.format(undefined, 'dd.MM.YYYY')).not.toThrow();
    expect(dateService.format(undefined, 'dd.MM.YYYY')).toEqual('');
  });

  describe('service global config', () => {
    const FORMAT: string = 'MM-dd-yyyy';
    const year: number = 2010;
    const monthIndex: number = 10;
    const month: number = monthIndex + 1;
    const day: number = 20;
    const date: Date = new Date(year, monthIndex, day);
    const formattedDate: string = `${month}-${day}-${year}`;

    beforeEach(() => {
      dateService = new DateFnsService('en', {
        format: FORMAT,
      });
    });

    it('* should use format from global config if isn\'t passed as parameter', () => {
      expect(dateService.format(date, undefined)).toEqual(formattedDate);

      const parsedDate = dateService.parse(formattedDate, '');

      expect(parsedDate.valueOf()).toEqual(date.valueOf());
    });

    it('* should use parameter over global config format if presented', () => {
      expect(dateService.format(date, undefined)).toEqual(formattedDate);

      const parsedDate = dateService.parse(formattedDate, FORMAT);
      expect(parsedDate.valueOf()).toEqual(date.valueOf());
    });

    it('* should pass parseOptions to parse function', () => {
      expect(dateService.parse(formattedDate, '')).toEqual(date);
    });

    it('* should pass formatOptions to format function', () => {
      expect(dateService.format(date, 'dd/MM/yyyy')).toEqual('20/11/2010');
    });
  });
});
