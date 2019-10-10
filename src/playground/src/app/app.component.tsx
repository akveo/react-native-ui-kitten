import React from 'react';
import { mapping as evaMapping } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {
  ApplicationProvider,
  ApplicationProviderProps,
  IconPack,
  IconRegistry,
} from 'react-native-ui-kitten';
import {
  ApplicationLoader,
  ApplicationLoaderElement,
} from './applicationLoader.component';
import { default as appMapping } from './mapping.json';
import {
  AntDesignIconsPack,
  FeatherIconsPack,
  FontAwesomeIconsPack,
  MaterialCommunityIconsPack,
  MaterialIconsPack,
} from '../icons';
import { Router } from '../navigation';
import {
  ThemeContext,
  ThemeContextType,
  ThemeKey,
  themes,
} from '../themes';

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

const fonts: { [key: string]: number } = {
  'OpenSans-Regular': require('../assets/OpenSans-Regular.ttf'),
};

export default class App extends React.Component {

  public state: State = {
    theme: 'Eva Light',
  };

  private get appConfig(): ApplicationProviderProps {
    const { [this.state.theme]: currentTheme } = themes;

    return {
      mapping: evaMapping,
      theme: currentTheme,
      customMapping: appMapping,
    };
  }

  private get themeContext(): ThemeContextType {
    return {
      name: this.state.theme,
      toggleTheme: this.toggleTheme,
    };
  }

  private toggleTheme = (theme: string): void => {
    this.setState({ theme });
  };

  public render(): ApplicationLoaderElement {
    return (
      <ApplicationLoader assets={{ fonts }}>
        <IconRegistry icons={icons}/>
        <ApplicationProvider {...this.appConfig}>
          <ThemeContext.Provider value={this.themeContext}>
            <Router/>
          </ThemeContext.Provider>
        </ApplicationProvider>
      </ApplicationLoader>
    );
  }
}
