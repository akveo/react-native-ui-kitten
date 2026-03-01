import React from 'react';
import { ThemeStyleType } from '@ui-kitten/processor';

const defaultValue: ThemeStyleType = {};

export const MappingContext: React.Context<ThemeStyleType> = React.createContext(defaultValue);
