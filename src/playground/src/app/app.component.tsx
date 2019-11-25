import React from 'react';
import { mapping as evaMapping } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {
  ApplicationProvider,
  ApplicationProviderProps,
  IconPack,
  IconRegistry,
} from 'react-native-ui-kitten';
import { ApplicationLoader } from './applicationLoader.component';
import { Router } from '../navigation';
import {
  AntDesignIconsPack,
  FeatherIconsPack,
  FontAwesomeIconsPack,
  MaterialCommunityIconsPack,
  MaterialIconsPack,
} from '../icons';
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

const fonts = {
  'regular': require('../assets/fonts/opensans-regular.ttf'),
  'semibold': require('../assets/fonts/opensans-semibold.ttf'),
  'bold': require('../assets/fonts/opensans-bold.ttf'),
};

export default class App extends React.Component<{}, State> {

  public state: State = {
    theme: 'Eva Light',
  };

  private get appConfig(): ApplicationProviderProps {
    const { [this.state.theme]: currentTheme } = themes;

    return {
      mapping: evaMapping,
      theme: currentTheme,
      // @ts-ignore
      customMapping: { strict: { 'text-font-family': 'regular' } },
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
      <ApplicationLoader assets={{ fonts }} splash={require('../assets/images/splash.png')}>
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
