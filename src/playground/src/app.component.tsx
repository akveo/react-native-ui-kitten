import React from 'react';
import { default as mapping } from '@eva/eva';
import { theme } from '@eva/theme-eva';
import {
  ApplicationProvider,
  ThemeType,
} from '@kitten/theme';
import { withNavigation } from './navigation';
import * as Screens from './ui/screen';
import {
  ThemeContext,
  ContextType,
} from './ui/themeContext';

interface State {
  currentTheme: 'light' | 'dark';
  theme: ThemeType;
}

export default class App extends React.Component {

  public state: State = {
    currentTheme: 'light',
    theme: theme,
  };

  private setTheme = (newTheme: ThemeType, themeName: 'light' | 'dark'): void => {
    this.setState({
      theme: newTheme,
      currentTheme: themeName,
    });
  };

  private toggleTheme = (themeName: 'light' | 'dark'): void => {
    console.log(themeName);
    this.setState({ currentTheme: themeName });
  };

  public render(): React.ReactNode {
    const { Home: RootScreen, ...screens } = Screens;
    const Router: React.ComponentClass = withNavigation(RootScreen, screens);
    const { currentTheme } = this.state;
    const contextValue: ContextType = {
      currentTheme: currentTheme,
      toggleTheme: this.toggleTheme,
    };

    return (
      <ThemeContext.Provider value={contextValue}>
        <ApplicationProvider
          mapping={mapping}
          theme={this.state.theme}>
          <Router/>
        </ApplicationProvider>
      </ThemeContext.Provider>
    );
  }
}

