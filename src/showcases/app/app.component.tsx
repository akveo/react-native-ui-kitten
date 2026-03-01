import React from 'react';
import { enableScreens } from 'react-native-screens';
import * as eva from '@ui-kitten/eva';
import * as material from '@ui-kitten/material';
import {
  ApplicationProvider,
  IconRegistry,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as customMapping } from './mapping.json';
import { themes } from './themes';
import { AppNavigator } from '../navigation/app.navigator';
import {
  AppMapping,
  AppTheme,
  ThemeContext,
  ThemeContextType,
} from '../services/theme.service';

enableScreens();

const mappings = {
  Eva: eva.mapping,
  Material: material.mapping,
};

export default function App(): React.ReactElement {
  const [mapping, setMapping] = React.useState<AppMapping>(AppMapping.eva);
  const [theme, setTheme] = React.useState<AppTheme>(AppTheme.light);

  const isDarkMode = React.useCallback((): boolean => {
    return theme === AppTheme.dark;
  }, [theme]);

  const themeContextValue = React.useMemo<ThemeContextType>(() => ({
    mapping,
    theme,
    setMapping,
    setTheme,
    isDarkMode,
  }), [mapping, theme, isDarkMode]);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        mapping={mappings[mapping]}
        theme={themes[mapping][theme]}
        // @ts-ignore
        customMapping={customMapping}
      >
        <ThemeContext.Provider value={themeContextValue}>
          <AppNavigator />
        </ThemeContext.Provider>
      </ApplicationProvider>
    </>
  );
}
