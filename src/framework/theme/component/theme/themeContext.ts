import React from 'react';
import { Tokens } from '@rk-kit/design';
import { ThemeType } from './type';

const defaultValue: ThemeType = Tokens;
const ThemeContext = React.createContext(defaultValue);

export default ThemeContext;
