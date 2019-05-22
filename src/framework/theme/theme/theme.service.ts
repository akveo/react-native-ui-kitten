import { ThemeType } from './type';

const SYMBOL_REFERENCE: string = '$';

/**
 * @param name: string - theme property name, like `backgroundColor`
 * @param theme: ThemeType - theme
 * @param fallback: any - fallback value
 *
 * @return any. Theme property value if it presents in theme, fallback otherwise
 */
export function getThemeValue(name: string, theme: ThemeType, fallback?: any): any | undefined {
  return findThemeValue(name, theme) || fallback;
}

function findThemeValue(name: string, theme: ThemeType): any | undefined {
  const value: any = theme[name];

  if (isReferenceKey(value)) {
    const themeKey: string = toThemeKey(value);

    return findThemeValue(themeKey, theme);
  }

  return value;
}

/**
 * @returns true if theme value references to another
 */
function isReferenceKey(value: any): boolean {
  return `${value}`.startsWith(SYMBOL_REFERENCE);
}

/**
 * Transforms reference key to theme key
 */
function toThemeKey(value: any): string {
  return `${value}`.substring(1);
}
