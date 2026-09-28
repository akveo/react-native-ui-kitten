/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { LiteralUnion } from '../../devsupport/typings';
import { ThemeContext } from './themeContext';
import { KnownThemeKey } from './themeKeys';

export type ThemeValue = string;
/**
 * A theme token name: one of the tokens the bundled design systems define, or any custom token.
 */
export type ThemeKey = LiteralUnion<KnownThemeKey>;
/**
 * A theme: the known tokens are suggested by the editor, custom tokens are allowed through the
 * `string` index signature (an intersection, not an interface, so the optional known keys do not
 * conflict with the index signature in the emitted declarations).
 */
export type ThemeType = { [K in KnownThemeKey]?: ThemeValue } & Record<string, ThemeValue>;

/**
 * Takes an actual theme provided by ApplicationProvider or ThemeProvider and
 * returns it to a functional component.

 * @overview-example UseThemeSimpleUsage
 * Complete list of theme variables could be found under [Light Theme Variables](design-system/eva-light-theme) table.
 *
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
    const compiled: ThemeType = {};
    for (const key in theme) {
      compiled[key] = ThemeService.getValue(key, theme, key);
    }
    return compiled;
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
