import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ApplicationProvider,
  ApplicationProviderProps,
  IconPack,
  IconRegistry,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light, dark } from '@eva-design/eva';
import { AppNavigator } from '@pg/navigation/app.navigator';
import { MaterialIconsPack } from '@pg/icons/materialIconPack';
import {
  AppTheme,
  ThemeContext,
  ThemeContextType,
} from '@pg/themes/themeContext';
import { ApplicationLoader } from './applicationLoader.component';

const themes = {
  Light: light,
  Dark: dark,
};

const customMapping = {
  strict: { 'text-font-family': 'System' },
};

const fonts = {
  'opensans-regular': require('../assets/fonts/opensans-regular.ttf'),
  'roboto-regular': require('../assets/fonts/roboto-regular.ttf'),
};

const icons: IconPack<any>[] = [
  EvaIconsPack,
  MaterialIconsPack,
];

export default () => {

  const [theme, setTheme] = React.useState<AppTheme>(AppTheme.light);

  const isDarkMode = (): boolean => {
    return theme === AppTheme.dark;
  };

  const applicationProviderConfig: ApplicationProviderProps = {
    mapping: mapping,
    theme: themes[theme],
    customMapping: customMapping,
  };

  const themeContextProviderConfig: ThemeContextType = {
    theme: theme,
    setTheme: setTheme,
    isDarkMode: isDarkMode,
  };

  return (
    <React.Fragment>
      <IconRegistry icons={icons}/>
      <ApplicationLoader assets={{ fonts }} splash={require('../assets/images/splash.png')}>
        <IconRegistry icons={icons} />
        <ApplicationProvider {...applicationProviderConfig}>
          <SafeAreaProvider>
            <ThemeContext.Provider value={themeContextProviderConfig}>
              <AppNavigator />
            </ThemeContext.Provider>
          </SafeAreaProvider>
        </ApplicationProvider>
      </ApplicationLoader>
    </React.Fragment>
  );
};
