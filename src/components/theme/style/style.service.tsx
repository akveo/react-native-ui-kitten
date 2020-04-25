/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { StyleSheet } from 'react-native';
import {
  ThemeService,
  ThemeType,
  useTheme,
} from '../theme/theme.service';

export type StyleType = Record<string, any>;
export type Styles<T> = StyleSheet.NamedStyles<T>;

/**
 * User interactions that can be handled by Eva.
 */
export enum Interaction {
  HOVER = 'hover',
  ACTIVE = 'active',
  FOCUSED = 'focused',
  INDETERMINATE = 'indeterminate',
  VISIBLE = 'visible',
}

/**
 * Component states that can be handled by Eva.
 */
export enum State {
  CHECKED = 'checked',
  SELECTED = 'selected',
  DISABLED = 'disabled',
}

/**
 * Takes a theme provided by ApplicationProvider or ThemeProvider and applies it to style.
 * Consider not using this function when not using Eva theme variables.
 *
 * @overview-example UseStyleSheetSimpleUsage
 */
export const useStyleSheet = <T extends Styles<T>>(styles: Styles<T>): T => {
  const theme: ThemeType = useTheme();

  return StyleService.createThemed(styles, theme);
};

/**
 * Service for creating styles that fit current theme.
 * Unlike StyleSheet class exported from React Native package, it allows using Eva theme variables.
 */
export class StyleService {

  /**
   * Unlike `StyleSheet.create` from RN package,
   * this does nothing with `styles` validation because of inability to process Eva theme variables
   * and returns styles as it is just to support the syntax we used to.
   *
   * However, this may be useful to have this function
   * because future RN versions may allow pre-processing.
   * @see {StyleSheet.setStyleAttributePreprocessor}
   *
   * Notice it is better to use `StyleSheet.create` from RN package since it does style registering.
   * You don't need to use this function if custom variables are not used.
   *
   * When using Eva theme variables, `useStyleSheet` should be called.
   *
   * @example
   * ```
   * const Component = () => {
   *   const styles = useStyleSheet(themedStyles);
   *   return (
   *     <View style={styles.container} />
   *   );
   * };
   *
   * const themedStyles = StyleService.create({
   *   container: { backgroundColor: 'color-primary-default' },
   * });
   * ```
   */
  static create = <T extends Styles<T>>(styles: T): T => {
    return styles;
  };

  /**
   * @returns stylesheet mapped to theme
   */
  static createThemed = <T extends Styles<T>>(styles: Styles<T>, theme: ThemeType): T => {
    return Object.keys(styles).reduce((acc: T, key: string): T => {
      return { ...acc, [key]: StyleService.createThemedEntry(styles[key], theme) };
    }, {} as T);
  };

  /**
   * @returns a style mapped to theme
   */
  static createThemedEntry = (style: StyleType, theme: ThemeType): StyleType => {
    return Object.keys(style).reduce((acc: StyleType, key: string): StyleType => {
      const value: any = style[key];
      return { ...acc, [key]: ThemeService.getValue(value, theme, value) };
    }, {});
  };
}


