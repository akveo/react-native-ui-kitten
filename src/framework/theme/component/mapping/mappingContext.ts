import React from 'react';
import { ThemeMappingType } from './type';

const defaultValue: ThemeMappingType[] = [];
const MappingContext = React.createContext(defaultValue);

export default MappingContext;
