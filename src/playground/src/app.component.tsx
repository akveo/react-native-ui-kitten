import React from 'react';
import { mapping as evaMapping } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {
  ApplicationProvider,
  ApplicationProviderProps,
  IconPack,
  IconRegistry,
} from 'react-native-ui-kitten';
import { Router } from './navigation';
import {
  AntDesignIconsPack,
  FeatherIconsPack,
  FontAwesomeIconsPack,
  MaterialCommunityIconsPack,
  MaterialIconsPack,
} from './icons';
import {
  ThemeContext,
  ThemeContextType,
  ThemeKey,
  themes,
} from './themes';

interface State {
  theme: ThemeKey;
}

const icons: IconPack<any>[] = [
  EvaIconsPack,
  AntDesignIconsPack,
  FeatherIconsPack,
  FontAwesomeIconsPack,
  MaterialIconsPack,
  MaterialCommunityIconsPack,
];

export default class App extends React.Component<{}, State> {

  public state: State = {
    theme: 'Eva Light',
  };

  private get appConfig(): ApplicationProviderProps {
    const { [this.state.theme]: currentTheme } = themes;

    return {
      mapping: evaMapping,
      theme: currentTheme,
    };
  }

  private get themeContext(): ThemeContextType {
    return {
      name: this.state.theme,
      toggleTheme: this.toggleTheme,
    };
  }

  private toggleTheme = (theme: ThemeKey): void => {
    this.setState({ theme });
  };

  public render(): React.ReactFragment {
    return (
      <React.Fragment>
        <IconRegistry icons={icons}/>
        <ApplicationProvider {...this.appConfig}>
          <ThemeContext.Provider value={this.themeContext}>
            <Router/>
          </ThemeContext.Provider>
        </ApplicationProvider>
      </React.Fragment>
    );
  }
}
