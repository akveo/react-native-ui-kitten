import React from 'react';
import { ThemeShape } from '../component';

const defaultThemeValue: ThemeShape = {};

const {
  Provider,
  Consumer,
} = React.createContext(defaultThemeValue);

export {
  Provider,
  Consumer,
};
