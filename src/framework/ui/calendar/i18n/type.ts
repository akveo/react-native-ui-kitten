/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export enum TranslationWidth {
  SHORT = 'short',
  LONG = 'long',
}

export interface I18nDayNames {
  [TranslationWidth.SHORT]: string[];
  [TranslationWidth.LONG]: string[];
}

export interface I18nMonthNames {
  [TranslationWidth.SHORT]?: string[];
  [TranslationWidth.LONG]?: string[];
}

export interface I18nConfig {
  dayNames: I18nDayNames;
  monthNames: I18nMonthNames;
}
