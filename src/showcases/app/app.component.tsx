import React from 'react';
import { mapping } from '@eva-design/eva';
import {
  ApplicationProvider,
  ApplicationProviderProps,
  IconRegistry,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as customMapping } from './mapping.json';
import { themes } from './themes';
import { AppNavigator } from '../navigation/app.navigator';
import {
  AppTheme,
  ThemeContext,
  ThemeContextType,
} from '../services/theme.service';

export default (): React.ReactElement => {

  const [theme, setTheme] = React.useState<AppTheme>(AppTheme.light);

  const isDarkMode = (): boolean => {
    return theme === AppTheme.dark;
  };

  const applicationProviderConfig: ApplicationProviderProps = {
    mapping: mapping,
    theme: themes[theme],
    // @ts-ignore
    customMapping: customMapping,
  };

  const themeContextProviderConfig: ThemeContextType = {
    theme: theme,
    setTheme: setTheme,
    isDarkMode: isDarkMode,
  };

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...applicationProviderConfig}>
        <ThemeContext.Provider value={themeContextProviderConfig}>
          <AppNavigator/>
        </ThemeContext.Provider>
      </ApplicationProvider>
    </React.Fragment>
  );
};
