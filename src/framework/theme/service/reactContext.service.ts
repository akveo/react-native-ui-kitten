import React from 'react';
import { ThemeType } from '../component';

const defaultThemeValue: ThemeType = {};

const {
  Provider,
  Consumer,
} = React.createContext(defaultThemeValue);

export {
  Provider,
  Consumer,
};
