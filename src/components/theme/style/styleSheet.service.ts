import { StyleSheet as RNStyleSheet } from 'react-native';

type ThemeValue = string;

export type ThemeType = Record<string, ThemeValue>;
export type StyleType = Record<string, any>;
export type Styles<T> = RNStyleSheet.NamedStyles<T>;

export class StyleSheet {

  static createThemedStyles = <T>(styles: Styles<T>, theme: ThemeType): T => {
    return Object.keys(styles).reduce((acc: T, key: string): T => {
      return { ...acc, [key]: StyleSheet.createThemedStyle(styles[key], theme)  };
    }, {} as T);
  };

  static createThemedStyle = (style: StyleType, theme: ThemeType): StyleType => {
    return Object.keys(style).reduce((acc: StyleType, key: string): StyleType => {
      const value: any = style[key];
      return { ...acc, [key]: StyleSheet.getThemeValue(value, theme, value) };
    }, {});
  };

  static createCompiledTheme = (theme: ThemeType): ThemeType => {
    return Object.keys(theme).reduce((acc: ThemeType, key: string): ThemeType => {
      return { ...acc, [key]: StyleSheet.getThemeValue(key, theme, key) };
    }, {});
  };

  static getThemeValue = (name: string, theme: ThemeType, fallback?: ThemeValue): ThemeValue | undefined => {
    if (StyleSheet.isReference(name)) {
      const themeKey: string = StyleSheet.toThemeKey(name);
      return StyleSheet.findThemeValue(themeKey, theme) || fallback;
    }

    return StyleSheet.findThemeValue(name, theme) || fallback;
  };

  static findThemeValue = (name: string, theme: ThemeType): ThemeValue | undefined => {
    const value: ThemeValue = theme[name];

    if (StyleSheet.isReference(value)) {
      const themeKey: string = StyleSheet.toThemeKey(value);
      return StyleSheet.findThemeValue(themeKey, theme);
    }

    return value;
  };

  /**
   * @returns true if theme value references to another
   */
  static isReference = (value: ThemeValue): boolean => {
    return `${value}`.startsWith('$');
  };

  /**
   * Transforms reference key to theme key
   */
  static toThemeKey = (value: ThemeValue): string => {
    return `${value}`.substring(1);
  };
}
