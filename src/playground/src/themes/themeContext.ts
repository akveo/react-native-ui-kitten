import React from 'react';
import { ThemeKey } from './registry';

export interface ThemeContextType {
  name: ThemeKey;
  toggleTheme: (theme: ThemeKey) => void;
}

const initialValue: ThemeContextType = {
  name: 'Eva Light',
  toggleTheme: (theme: ThemeKey) => {},
};

export const ThemeContext: React.Context<ThemeContextType> = React.createContext(initialValue);
