/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NativeDateService } from 'react-native-ui-kitten';

// @ts-ignore
import dateFnsParse, { default as rollupParse } from 'date-fns/parse';
// @ts-ignore
import dateFnsFormat, { default as rollupFormat } from 'date-fns/format';

const parse = rollupParse || dateFnsParse;
const formatDate = rollupFormat || dateFnsFormat;

export interface DateFnsOptions {
  format: string;
  parseOptions: {};
  formatOptions: {};
}

export class DateFnsService extends NativeDateService {

  protected options: Partial<DateFnsOptions>;

  constructor(locale: string, options: DateFnsOptions) {
    super(locale);
    this.setLocale(locale);
    this.options = options || {};
  }

  public format(date: Date, format: string): string {
    if (date) {
      return formatDate(date, format || this.options.format, this.options.formatOptions);
    }

    return '';
  }

  public parse(date: string, format: string): Date {
    return parse(date, format || this.options.format, new Date(), this.options.parseOptions);
  }

  public getId(): string {
    return 'date-fns';
  }
}
