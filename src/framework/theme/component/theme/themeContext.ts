import React from 'react';
import { ThemeType } from './type';

const defaultValue: ThemeType = {};
const ThemeContext = React.createContext(defaultValue);

export default ThemeContext;
