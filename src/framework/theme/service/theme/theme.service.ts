import { ThemeType } from '../../type';

/**
 * @param name: string - theme property name, like `backgroundColor`
 * @param theme: ThemeType - theme
 * @param fallback: any - fallback value
 *
 * @return any. Theme property value if it presents in theme, fallback otherwise
 */
export function getThemeValue(name: string, theme: ThemeType, fallback?: any): any | undefined {
  return theme[name] || fallback;
}
