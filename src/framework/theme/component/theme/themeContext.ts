import React from 'react';
import { ThemeType } from '../../type';

export type ThemeContextValueType = ThemeType;

const defaultValue: ThemeContextValueType = {};

export const ThemeContext: React.Context<ThemeContextValueType> = React.createContext(defaultValue);
