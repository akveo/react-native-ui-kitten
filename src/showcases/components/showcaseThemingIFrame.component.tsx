import React from 'react';
import { ThemeProvider, ThemeProviderProps, ThemeType } from '@ui-kitten/components';
import { ShowcaseIFrame } from './showcaseIFrame.component';
import { ThemeContext } from '../services/theme.service';
import { themes } from '../app/themes';

const orangeTheme: ThemeType = {
  'color-primary-100': '#FFECD2',
  'color-primary-200': '#FFD3A6',
  'color-primary-300': '#FFB579',
  'color-primary-400': '#FF9758',
  'color-primary-500': '#FF6721',
  'color-primary-600': '#DB4818',
  'color-primary-700': '#B72F10',
  'color-primary-800': '#931A0A',
  'color-primary-900': '#7A0C06',
  'color-primary-transparent-100': 'rgba(255, 103, 33, 0.08)',
  'color-primary-transparent-200': 'rgba(255, 103, 33, 0.16)',
  'color-primary-transparent-300': 'rgba(255, 103, 33, 0.24)',
  'color-primary-transparent-400': 'rgba(255, 103, 33, 0.32)',
  'color-primary-transparent-500': 'rgba(255, 103, 33, 0.4)',
  'color-primary-transparent-600': 'rgba(255, 103, 33, 0.48)',
};

export const ShowcaseThemingIFrame = (Component: React.ComponentType, showcaseId: string): React.ReactElement => {

  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themes[themeContext.mapping][themeContext.theme];

  const OrangeThemeProvider = (props: ThemeProviderProps) => (
    <ThemeProvider {...props} theme={{ ...currentTheme, ...orangeTheme }}>
      <Component/>
    </ThemeProvider>
  );

  return ShowcaseIFrame(OrangeThemeProvider, showcaseId);
};
