/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { ThemeContext } from './themeContext';

export type ThemeValue = string;
export type ThemeType = Record<string, ThemeValue>;

/**
 * Takes an actual theme provided by ApplicationProvider or ThemeProvider and
 * @returns it to a functional component.
 *
 * @overview-example UseThemeSimpleUsage
 */
export const useTheme = (): ThemeType => {
  return React.useContext(ThemeContext);
};

/**
 * Service for working with Eva themes
 */
export class ThemeService {

  /**
   * @returns compiled theme since Eva theme may contain variables referencing each other.
   */
  static create = (theme: ThemeType): ThemeType => {
    return Object.keys(theme).reduce((acc: ThemeType, key: string): ThemeType => {
      return { ...acc, [key]: ThemeService.getValue(key, theme, key) };
    }, {});
  };

  /**
   * Finds theme value recursively since eva theme variables can reference each other.
   *
   * @returns ThemeValue if found, fallback param otherwise.
   */
  static getValue = (name: string,
                     theme: ThemeType,
                     fallback?: ThemeValue): ThemeValue | undefined => {

    if (ThemeService.isReference(name)) {
      const themeKey: string = ThemeService.createKeyFromReference(name);
      return ThemeService.findValue(themeKey, theme) || fallback;
    }

    return ThemeService.findValue(name, theme) || fallback;
  };

  /**
   * Finds theme value recursively since eva theme variables can reference each other.
   *
   * @returns ThemeValue if found.
   */
  private static findValue = (name: string, theme: ThemeType): ThemeValue | undefined => {
    const value: ThemeValue = theme[name];

    if (ThemeService.isReference(value)) {
      const themeKey: string = ThemeService.createKeyFromReference(value);
      return ThemeService.findValue(themeKey, theme);
    }

    return value;
  };

  /**
   * @returns true if theme value references to another
   */
  private static isReference = (value: ThemeValue): boolean => {
    return `${value}`.startsWith('$');
  };

  /**
   * Transforms reference key to theme key
   */
  private static createKeyFromReference = (value: ThemeValue): string => {
    return `${value}`.substring(1);
  };
}
