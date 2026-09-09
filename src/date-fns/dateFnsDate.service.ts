/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  NativeDateService,
  NativeDateServiceOptions,
} from '@ui-kitten/components';
import { parse as dateFnsParse, format as dateFnsFormat } from 'date-fns';

export interface DateFnsOptions extends NativeDateServiceOptions {
  parseOptions?: {
    useAdditionalDayOfYearTokens: boolean;
    useAdditionalWeekYearTokens: boolean;
  };
  formatOptions?: {
    useAdditionalDayOfYearTokens: boolean;
    useAdditionalWeekYearTokens: boolean;
  };
}

const DEFAULT_FORMAT = 'dd/MM/yyyy';

const DEFAULT_OPTIONS: DateFnsOptions = {
  format: DEFAULT_FORMAT,
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

  constructor(locale = 'en', options?: DateFnsOptions) {
    super(locale, { ...DEFAULT_OPTIONS, ...options });
  }

  /**
   * `NativeDateServiceOptions.format` is optional, so fall back to the default rather than
   * handing date-fns an undefined format string.
   */
  private resolveFormat(format?: string): string {
    return format || this.options.format || DEFAULT_FORMAT;
  }

  public format(date: Date, format: string): string {
    if (date) {
      return dateFnsFormat(date, this.resolveFormat(format), (this.options as DateFnsOptions).formatOptions);
    }

    return '';
  }

  public parse(date: string, format: string): Date {
    return dateFnsParse(
      date,
      this.resolveFormat(format),
      new Date(),
      (this.options as DateFnsOptions).parseOptions,
    );
  }

  public getId(): string {
    return 'date-fns';
  }
}
