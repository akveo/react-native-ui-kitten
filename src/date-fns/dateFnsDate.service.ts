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

  constructor(locale = 'en', options?: DateFnsOptions) {
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
