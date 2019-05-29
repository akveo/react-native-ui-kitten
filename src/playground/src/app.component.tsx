import React from 'react';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from '@kitten/theme';
import { Router } from './navigation';
import {
  ThemeKey,
  themes,
  ThemeContext,
} from './themes';

interface State {
  theme: ThemeKey;
}

export default class App extends React.Component {

  public state: State = {
    theme: 'Eva Dark',
  };

  private toggleTheme = (theme: string) => {
    this.setState({ theme });
  };

  public render(): React.ReactNode {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={themes[this.state.theme]}>
        <ThemeContext.Provider value={{ toggleTheme: this.toggleTheme }}>
          <Router/>
        </ThemeContext.Provider>
      </ApplicationProvider>
    );
  }
}
