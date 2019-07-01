import React from 'react';

export interface ContextType {
  name: string;
  toggleTheme: (theme: string) => void;
}

export const ThemeContext: React.Context<ContextType> = React.createContext({
  name: 'Eva Light',
  toggleTheme: (theme: string) => {},
});
