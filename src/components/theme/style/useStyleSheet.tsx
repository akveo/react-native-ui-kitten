import {
  Styles,
  StyleSheet,
  ThemeType,
} from '../style/styleSheet.service';
import { useTheme } from '../theme/useTheme';

/**
 * Takes a theme provided by ApplicationProvider or ThemeProvider and applies it to style.
 *
 * @overview-example UseStyleSheetSimpleUsage
 */
export const useStyleSheet = <T extends Styles<T>>(styles: Styles<T>) => {
  return {
    create: (): T => {
      const theme: ThemeType = useTheme();
      return StyleSheet.createThemedStyles(styles, theme);
    },
  };
};
