import React from 'react';
import { ThemeType } from './type';

const defaultValue: ThemeType = {};

export const ThemeContext = React.createContext(defaultValue);
