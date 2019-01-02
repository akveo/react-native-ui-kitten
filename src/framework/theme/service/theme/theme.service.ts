import { ThemeType } from '../../component';

/**
 * @param name: string - theme property name, like `backgroundColor`
 * @param theme: ThemeType - theme
 *
 * @return any. Theme property value if it presents in theme, undefined otherwise
 */
export function getThemeValue(name: string, theme: ThemeType): any | undefined {
  return theme[name];
}
