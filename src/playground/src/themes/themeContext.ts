import React from 'react';

export interface ContextType {
  toggleTheme: (theme: string) => void;
}

export const ThemeContext: React.Context<ContextType> = React.createContext({
  toggleTheme: (theme: string) => {},
});
