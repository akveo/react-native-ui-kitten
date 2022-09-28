import React from 'react';
import { reloadAsync } from 'expo-updates';
import { enableScreens } from 'react-native-screens';
import * as eva from '@eva-design/eva';
import * as material from '@eva-design/material';
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
  AppMapping,
  AppTheme,
  ThemeContext,
  ThemeContextType,
} from '../services/theme.service';

const mappings = {
  Eva: eva.mapping,
  Material: material.mapping,
};

const storedMapping: string = localStorage.getItem('mapping');
const isMappingKey: boolean = Object.keys(mappings).includes(storedMapping);

const mapping: AppMapping = isMappingKey ? (storedMapping as AppMapping) : AppMapping.eva;

enableScreens();

// eslint-disable-next-line no-restricted-syntax, react/display-name
export default (): React.ReactElement => {

  const [theme, setTheme] = React.useState<AppTheme>(AppTheme.light);

  const dispatchMappingChange = (nextMapping: AppMapping): void => {
    localStorage.setItem('mapping', nextMapping);
    reloadAsync().then().catch(Promise.reject);
  };

  const isDarkMode = (): boolean => {
    return theme === AppTheme.dark;
  };

  const applicationProviderConfig: ApplicationProviderProps = {
    mapping: mappings[mapping],
    theme: themes[mapping][theme],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    customMapping: customMapping,
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const themeContextProviderConfig: ThemeContextType = {
    mapping: mapping,
    theme: theme,
    setMapping: dispatchMappingChange,
    setTheme: setTheme,
    isDarkMode: isDarkMode,
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...applicationProviderConfig}>
        <ThemeContext.Provider value={themeContextProviderConfig}>
          <AppNavigator />
        </ThemeContext.Provider>
      </ApplicationProvider>
    </>
  );
};
