/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { EvaStyleSheet, Styles, ThemeType } from './evaStyleSheet.service';
import { useTheme } from '../theme/useTheme';

/**
 * Service for creating styles that fit current theme.
 * Unlike StyleSheet class exported from React Native package, it allows using Eva theme variables.
 *
 * @overview-example UseStyleSheetSimpleUsage
 */
export class StyleSheet {

  /**
   * @returns a hook function that returns style mapped to current theme from the given object.
   */
  static create = <T extends Styles<T>>(styles: Styles<T>): () => T => {
    return (): T => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const theme: ThemeType = useTheme();
      return EvaStyleSheet.createThemedStyles(styles, theme);
    };
  };
}

