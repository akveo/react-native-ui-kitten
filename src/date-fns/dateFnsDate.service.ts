/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  NativeDateService,
  NativeDateServiceOptions,
} from '@ui-kitten/components';
import dateFnsParse from 'date-fns/parse';
import dateFnsFormat from 'date-fns/format';

export interface DateFnsOptions extends NativeDateServiceOptions {
  parseOptions?: {};
  formatOptions?: {};
}

const DEFAULT_OPTIONS: DateFnsOptions = {
  format: 'dd/MM/yyyy',
  parseOptions: {
    useAdditionalDayOfYearTokens: true,
    useAdditionalWeekYearTokens: true,
  },
  formatOptions: {
    useAdditionalDayOfYearTokens: true,
    useAdditionalWeekYearTokens: true,
  },
};

export class DateFnsService extends NativeDateService {

  constructor(locale: string = 'en', options?: DateFnsOptions) {
    super(locale, { ...DEFAULT_OPTIONS, ...options });
  }

  public format(date: Date, format: string): string {
    if (date) {
      return dateFnsFormat(date, format || this.options.format, (this.options as DateFnsOptions).formatOptions);
    }

    return '';
  }

  public parse(date: string, format: string): Date {
    return dateFnsParse(date, format || this.options.format, new Date(), (this.options as DateFnsOptions).parseOptions);
  }

  public getId(): string {
    return 'date-fns';
  }
}
