import React from 'react';
import { ThemeMappingType } from './type';

const defaultValue: ThemeMappingType = {};

export const MappingContext = React.createContext(defaultValue);
