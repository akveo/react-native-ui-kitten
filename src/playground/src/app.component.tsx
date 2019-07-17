import React from 'react';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from '@kitten/theme';
import { IconRegistry } from '@kitten/ui';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Router } from './navigation';
import {
  ThemeContext,
  ThemeKey,
  themes,
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

  public render(): React.ReactNode {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={themes[this.state.theme]}>
        <IconRegistry icons={EvaIconsPack}/>
        <ThemeContext.Provider
          value={{ name: this.state.theme, toggleTheme: this.toggleTheme }}>
          <Router/>
        </ThemeContext.Provider>
      </ApplicationProvider>
    );
  }
}
