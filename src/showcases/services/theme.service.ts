import React from 'react';

export enum AppMapping {
  eva = 'Eva',
  material = 'Material',
}

export enum AppTheme {
  light = 'Light',
  dark = 'Dark',
}

export interface ThemeContextType {
  mapping: AppMapping;
  theme: AppTheme;
  setMapping: (mapping: AppMapping) => void;
  setTheme: (theme: AppTheme) => void;
  isDarkMode: () => boolean;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  mapping: AppMapping.eva,
  theme: AppTheme.light,
  setMapping: (mapping: AppMapping) => {
  },
  setTheme: (theme: AppTheme) => {
  },
  isDarkMode: () => false,
});
