export type ThemeMappingType = any;

export interface ComponentMappingType {
  appearance: any;
}

export interface AppearanceType {
  mapping: MappingType;
  variant?: any;
}

export type VariantGroupType = any;

export interface VariantType {
  mapping: MappingType;
}

export interface MappingType {
  state?: StateType;
}

export type StateType = any;


export type TokenType = any;
