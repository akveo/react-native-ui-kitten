import React from 'react';
import {
  ThemeMappingType,
  ThemeMapType,
} from 'eva/packages/common';

export interface MappingContextValueType {
  mapping: ThemeMappingType;
  styles: ThemeMapType;
}

const defaultValue: MappingContextValueType = {
  mapping: {},
  styles: {},
};

export const MappingContext: React.Context<MappingContextValueType> = React.createContext(defaultValue);
