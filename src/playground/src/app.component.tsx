import React from 'react';
import { mapping } from '@eva-design/eva';
import {
  ApplicationProvider,
  ApplicationProviderElement,
} from '@kitten/theme';
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
    theme: 'Eva Light',
  };

  private toggleTheme = (theme: string) => {
    this.setState({ theme });
  };

  public render(): ApplicationProviderElement {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={themes[this.state.theme]}>
        <ThemeContext.Provider
          value={{ name: this.state.theme, toggleTheme: this.toggleTheme }}>
          <Router/>
        </ThemeContext.Provider>
      </ApplicationProvider>
    );
  }
}
