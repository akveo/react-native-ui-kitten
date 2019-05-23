import React from 'react';
import { default as mapping } from '@eva/eva';
import { light as theme } from '@eva/themes';
import {
  ApplicationProvider,
  ThemeType,
} from '@kitten/theme';
import {
  ThemeContext,
  ContextType,
} from './ui/themeContext';
import { Router } from './navigation';

interface State {
  currentTheme: 'light' | 'dark';
  theme: ThemeType;
}

export default class App extends React.Component {

  public state: State = {
    currentTheme: 'light',
    theme: theme,
  };

  private toggleTheme = (themeName: 'light' | 'dark'): void => {
    let newTheme: ThemeType = null;
    if (themeName === 'light') {
      newTheme = theme;
    } else {
      newTheme = darkTheme;
    }
    this.setState({
      currentTheme: themeName,
      theme: newTheme,
    });
  };

  public render(): React.ReactNode {
    const { currentTheme } = this.state;
    const contextValue: ContextType = {
      currentTheme: currentTheme,
      toggleTheme: this.toggleTheme,
    };

    return (
      <ThemeContext.Provider value={contextValue}>
        <ApplicationProvider
          mapping={mapping}
          theme={this.state.theme}>
          <Router/>
        </ApplicationProvider>
      </ThemeContext.Provider>
    );
  }
}

const darkTheme: ThemeType = {
  'color-basic-100': '#FFFFFF',
  'color-basic-200': '#F7F8FA',
  'color-basic-300': '#EDF0F4',
  'color-basic-400': '#DDE1EB',
  'color-basic-500': '#C8CEDB',
  'color-basic-600': '#A7B0C1',
  'color-basic-700': '#657084',
  'color-basic-800': '#2E384F',
  'color-basic-900': '#232A40',
  'color-basic-1000': '#1A1F33',
  'color-basic-1100': '#131729',

  'color-primary-100': '#F2F6FF',
  'color-primary-200': '#D9E4FF',
  'color-primary-300': '#A6C1FF',
  'color-primary-400': '#598BFF',
  'color-primary-500': '#3366FF',
  'color-primary-600': '#284DE0',
  'color-primary-700': '#2541CC',
  'color-primary-800': '#192F9E',
  'color-primary-900': '#14236E',

  'color-secondary-100': '#F7F2FF',
  'color-secondary-200': '#E0D1FF',
  'color-secondary-300': '#C5A8FF',
  'color-secondary-400': '#A375FF',
  'color-secondary-500': '#884DFF',
  'color-secondary-600': '#6A39DB',
  'color-secondary-700': '#4F28B8',
  'color-secondary-800': '#371B94',
  'color-secondary-900': '#26117A',

  'color-tertiary-100': '#FFDED6',
  'color-tertiary-200': '#FFDED6',
  'color-tertiary-300': '#FFDED6',
  'color-tertiary-400': '#FFDED6',
  'color-tertiary-500': '#FFDED6',
  'color-tertiary-600': '#FFDED6',
  'color-tertiary-700': '#FFDED6',
  'color-tertiary-800': '#FFDED6',
  'color-tertiary-900': '#FFDED6',

  'color-success-100': '#F0FFF5',
  'color-success-200': '#CCFCE3',
  'color-success-300': '#8CFAC7',
  'color-success-400': '#2CE69B',
  'color-success-500': '#00D68F',
  'color-success-600': '#00B887',
  'color-success-700': '#00997A',
  'color-success-800': '#007D6C',
  'color-success-900': '#004A42',

  'color-info-100': '#F2F8FF',
  'color-info-200': '#C7E2FF',
  'color-info-300': '#94CBFF',
  'color-info-400': '#42AAFF',
  'color-info-500': '#0095FF',
  'color-info-600': '#006FD6',
  'color-info-700': '#0057C2',
  'color-info-800': '#0041A8',
  'color-info-900': '#002885',

  'color-warning-100': '#FFFDF2',
  'color-warning-200': '#FFF1C2',
  'color-warning-300': '#FFE59E',
  'color-warning-400': '#FFC94D',
  'color-warning-500': '#FFAA00',
  'color-warning-600': '#DB8B00',
  'color-warning-700': '#B86E00',
  'color-warning-800': '#945400',
  'color-warning-900': '#703C00',

  'color-danger-100': '#FFF2F2',
  'color-danger-200': '#FFD6D9',
  'color-danger-300': '#FFA8B4',
  'color-danger-400': '#FF708D',
  'color-danger-500': '#FF3D71',
  'color-danger-600': '#DB2C66',
  'color-danger-700': '#B81D5B',
  'color-danger-800': '#94124E',
  'color-danger-900': '#700940',

  'background-color-default-1': '$color-basic-800',
  'background-color-default-2': '$color-basic-900',
  'background-color-default-3': '$color-basic-1000',
  'background-color-default-4': '$color-basic-1100',

  'background-color-alternative-1': '$color-basic-100',
  'background-color-alternative-2': '$color-basic-200',
  'background-color-alternative-3': '$color-basic-300',
  'background-color-alternative-4': '$color-basic-400',

  'background-color-primary-1': '$color-primary-500',
  'background-color-primary-2': '$color-primary-600',
  'background-color-primary-3': '$color-primary-700',
  'background-color-primary-4': '$color-primary-800',

  'border-color-default-1': '$color-basic-800',
  'border-color-default-2': '$color-basic-900',
  'border-color-default-3': '$color-basic-1000',
  'border-color-default-4': '$color-basic-1100',
  'border-color-default-5': '$color-basic-1100',

  'border-color-alternative-1': '$color-basic-100',
  'border-color-alternative-2': '$color-basic-200',
  'border-color-alternative-3': '$color-basic-3000',
  'border-color-alternative-4': '$color-basic-400',
  'border-color-alternative-5': '$color-basic-500',

  'border-color-primary-1': '$color-primary-500',
  'border-color-primary-2': '$color-primary-600',
  'border-color-primary-3': '$color-primary-700',
  'border-color-primary-4': '$color-primary-800',
  'border-color-primary-5': '$color-primary-900',

  'text-color-default': '$color-basic-100',
  'text-color-alternative': '$color-basic-1000',
  'text-color-control': '$color-basic-100',
  'text-color-disabled': '$color-basic-700',
  'text-color-hint': '$color-basic-600',

  'text-color-primary': '$color-primary-default',
  'text-color-primary-active': '$color-primary-active',
  'text-color-primary-disabled': '$color-primary-disabled',

  'text-color-success': '$color-success-default',
  'text-color-success-active': '$color-success-active',
  'text-color-success-disabled': '$color-success-disabled',

  'text-color-info': '$color-info-default',
  'text-color-info-active': '$color-info-active',
  'text-color-info-disabled': '$color-info-disabled',

  'text-color-warning': '$color-warning-default',
  'text-color-warning-active': '$color-warning-active',
  'text-color-warning-disabled': '$color-warning-disabled',

  'text-color-danger': '$color-danger-default',
  'text-color-danger-active': '$color-danger-active',
  'text-color-danger-disabled': '$color-danger-disabled',

  'icon-color-default': '$color-basic-500',
  'icon-color-active': '$color-basic-400',
  'icon-color-control': '$color-basic-100',
  'icon-color-hint': '$color-basic-700',
  'icon-color-disabled': '$color-basic-800',

  'outline-color': '$color-basic-700',

  'color-basic-default': '$color-basic-700',
  'color-basic-active': '$color-basic-900',
  'color-basic-focus': '$color-basic-1000',
  'color-basic-disabled': '$color-basic-600',

  'color-primary-default': '$color-primary-500',
  'color-primary-active': '$color-primary-600',
  'color-primary-focus': '$color-primary-700',
  'color-primary-disabled': '$color-primary-200',

  'color-success-default': '$color-success-500',
  'color-success-active': '$color-success-600',
  'color-success-focus': '$color-success-700',
  'color-success-disabled': '$color-success-200',

  'color-info-default': '$color-info-500',
  'color-info-active': '$color-info-600',
  'color-info-focus': '$color-info-700',
  'color-info-disabled': '$color-info-300',

  'color-warning-default': '$color-warning-500',
  'color-warning-active': '$color-warning-600',
  'color-warning-focus': '$color-warning-700',
  'color-warning-disabled': '$color-warning-300',

  'color-danger-default': '$color-danger-500',
  'color-danger-active': '$color-danger-600',
  'color-danger-focus': '$color-danger-700',
  'color-danger-disabled': '$color-danger-300',

  'color-alternative': '$color-basic-100',

  'color-white': '#FFFFFF',
  'color-black': '#0D1C2E',

  'font-primary-color': '#0D1C2E',
  'font-primary-inverse-color': '#FFFFFF',
};

