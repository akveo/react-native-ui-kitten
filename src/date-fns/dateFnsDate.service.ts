/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  I18nConfig,
  NativeDateService,
  NativeDateServiceOptions,
} from '@ui-kitten/components';
// @ts-ignore
import dateFnsParse, { default as rollupParse } from 'date-fns/parse';
// @ts-ignore
import dateFnsFormat, { default as rollupFormat } from 'date-fns/format';

const parse = rollupParse || dateFnsParse;
const formatDate = rollupFormat || dateFnsFormat;

export interface DateFnsOptions extends NativeDateServiceOptions {
  parseOptions: {};
  formatOptions: {};
}

export class DateFnsService extends NativeDateService {

  protected options: Partial<DateFnsOptions> = {
    format: `DD/MM/YYYY`,
  };

  constructor(locale: string = 'en', options?: DateFnsOptions) {
    super(locale, options);
    this.options = options || this.options;
  }

  public format(date: Date, format: string): string {
    if (date) {
      return formatDate(date, format || this.options.format, this.options.formatOptions);
    }

    return '';
  }

  public parse(date: string, format: string): Date {
    // Parse format is not supported in current version of date-fns
    return this.parseDate(date);
  }

  private parseDate(date: string): Date {
    return parse(date);
  }

  public getId(): string {
    return 'date-fns';
  }
}
