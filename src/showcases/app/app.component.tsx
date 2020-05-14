import React from 'react';
import { Updates } from 'expo';
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

export default (): React.ReactElement => {

  const [theme, setTheme] = React.useState<AppTheme>(AppTheme.light);

  const dispatchMappingChange = (nextMapping: AppMapping): void => {
    localStorage.setItem('mapping', nextMapping);
    Updates.reload().then();
  };

  const isDarkMode = (): boolean => {
    return theme === AppTheme.dark;
  };

  const applicationProviderConfig: ApplicationProviderProps = {
    mapping: mappings[mapping],
    theme: themes[mapping][theme],
    // @ts-ignore
    customMapping: customMapping,
  };

  const themeContextProviderConfig: ThemeContextType = {
    mapping: mapping,
    theme: theme,
    setMapping: dispatchMappingChange,
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
