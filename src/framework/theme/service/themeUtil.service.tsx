import { ThemeType } from '../component';

/**
 * @param theme: ThemeType - theme object
 * @param token: string - token name, like `color-primary`
 *
 * @return any. Theme token value if it presents in theme, `undefined` otherwise
 */
export function getThemeToken(theme: ThemeType, token: string): any | undefined {
  return theme[token];
}
