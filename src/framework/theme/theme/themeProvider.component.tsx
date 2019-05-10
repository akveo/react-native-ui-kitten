import React from 'react';
import { ThemeContext } from './themeContext';
import { ThemeType } from './type';

export interface ThemeProviderProps {
  theme: ThemeType;
  children?: React.ReactNode;
}

export class ThemeProvider extends React.PureComponent<ThemeProviderProps> {

  public render(): React.ReactNode {
    const { theme, children } = this.props;

    return (
      <ThemeContext.Provider
        value={theme}>
        {children}
      </ThemeContext.Provider>
    );
  }
}
