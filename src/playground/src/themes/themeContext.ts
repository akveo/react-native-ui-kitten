import React from 'react';
import { ThemeKey } from './registry';

export interface ContextType {
  name: ThemeKey;
  toggleTheme: (theme: string) => void;
}

export const ThemeContext: React.Context<ContextType> = React.createContext({
  toggleTheme: (theme: string) => {},
});
