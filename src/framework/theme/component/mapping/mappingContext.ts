import React from 'react';
import { ThemeStyleType } from 'eva/packages/types';

const defaultValue: ThemeStyleType = {};

export const MappingContext: React.Context<ThemeStyleType> = React.createContext(defaultValue);
