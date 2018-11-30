import React from 'react';
import { ThemeType } from '..';
import { Tokens } from '@rk-kit/design';

const defaultValue: ThemeType = Tokens;
const ThemeContext = React.createContext(defaultValue);

export default ThemeContext;
