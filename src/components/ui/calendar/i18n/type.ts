/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

type DaysArray = [string, string, string, string, string, string, string];
type MonthsArray = [string, string, string, string, string, string, string, string, string, string, string, string];

export enum TranslationWidth {
  SHORT = 'short',
  LONG = 'long',
}

export interface I18nDayNames {
  [TranslationWidth.SHORT]: DaysArray;
  [TranslationWidth.LONG]: DaysArray;
}

export interface I18nMonthNames {
  [TranslationWidth.SHORT]?: MonthsArray;
  [TranslationWidth.LONG]?: MonthsArray;
}

export interface I18nConfig {
  dayNames: I18nDayNames;
  monthNames: I18nMonthNames;
}
