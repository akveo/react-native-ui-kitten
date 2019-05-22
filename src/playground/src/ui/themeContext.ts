import React from 'react';

export interface ContextType {
  currentTheme: 'light' | 'dark';
  toggleTheme: (theme: string) => void;
}

export const ThemeContext: React.Context<ContextType> = React.createContext({
  currentTheme: 'light',
  toggleTheme: (theme: 'light' | 'dark') => {},
});
