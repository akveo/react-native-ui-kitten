import React from 'react';
import { mapping } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {
  ApplicationProvider,
  ApplicationProviderElement,
} from '@kitten/theme';
import { IconRegistry } from '@kitten/ui';
import {
  AntDesignIconsPack,
  FeatherIconsPack,
  FontAwesomeIconsPack,
  MaterialCommunityIconsPack,
  MaterialIconsPack,
} from './icons';
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

  private icons = [
    EvaIconsPack,
    AntDesignIconsPack,
    FeatherIconsPack,
    FontAwesomeIconsPack,
    MaterialIconsPack,
    MaterialCommunityIconsPack,
  ];

  private toggleTheme = (theme: string) => {
    this.setState({ theme });
  };

  public render(): ApplicationProviderElement {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={themes[this.state.theme]}>
        <IconRegistry icons={this.icons}/>
        <ThemeContext.Provider
          value={{
            name: this.state.theme,
            toggleTheme: this.toggleTheme,
          }}>
          <Router/>
        </ThemeContext.Provider>
      </ApplicationProvider>
    );
  }
}
