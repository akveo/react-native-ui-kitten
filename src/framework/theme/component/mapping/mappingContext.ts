import React from 'react';
import {
  ThemeMappingType,
  ThemeStyleType,
} from 'eva/packages/types';

export interface MappingContextValueType {
  mapping: ThemeMappingType;
  styles: ThemeStyleType;
}

const defaultValue: MappingContextValueType = {
  mapping: {},
  styles: {},
};

export const MappingContext: React.Context<MappingContextValueType> = React.createContext(defaultValue);
