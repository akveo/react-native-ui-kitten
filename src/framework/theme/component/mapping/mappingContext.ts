import React from 'react';
import {
  ThemeMappingType,
  ThemeStyleType,
} from 'eva/packages/types';

export interface MappingContextValueType {
  style: ThemeStyleType;
  mapping: ThemeMappingType;
}

const defaultValue: MappingContextValueType = {
  style: {},
  mapping: {},
};

export const MappingContext: React.Context<MappingContextValueType> = React.createContext(defaultValue);
