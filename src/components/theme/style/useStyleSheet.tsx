/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Styles,
  EvaStyleSheet,
  ThemeType,
} from './evaStyleSheet.service';
import { useTheme } from '../theme/useTheme';

/**
 * @deprecated since version 4.4.0-beta.3. Use `StyleSheet.create` from this package instead.
 *
 * Takes a theme provided by ApplicationProvider or ThemeProvider and applies it to style.
 */
export const useStyleSheet = <T extends Styles<T>>(styles: Styles<T>) => {
  const docRoot: string = 'https://akveo.github.io/react-native-ui-kitten/docs';

  const message: string = [
    'useStyleSheet is deprecated and will be removed in a stable version',
    'Consider migrating to a new syntax.',
    `📖 Documentation: ${docRoot}/components/themed-component/overview#stylesheet`,
  ].join('\n');

  console.warn(message);

  return {
    create: (): T => {
      const theme: ThemeType = useTheme();
      return EvaStyleSheet.createThemedStyles(styles, theme);
    },
  };
};
