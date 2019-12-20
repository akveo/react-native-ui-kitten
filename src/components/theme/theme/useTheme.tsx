import React from 'react';
import { ThemeContext } from './themeContext';
import { ThemeType } from '../style/styleSheet.service';

/**
 * Takes an actual theme provided by ApplicationProvider or ThemeProvider and returns it to a functional component.
 *
 * @overview-example UseThemeSimpleUsage
 */
export const useTheme = (): ThemeType => {
  return React.useContext(ThemeContext);
};
