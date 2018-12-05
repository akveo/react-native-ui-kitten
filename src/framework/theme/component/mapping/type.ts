export interface ThemeMappingType {
  name: string;
  parameters: ParameterType[];
  variants: VariantType[];
}

export interface ParameterType {
  name: string;
}

export interface VariantType {
  name: string;
  mapping: MappingType[];
}

export interface MappingType {
  parameter: string;
  token: string;
}

// TODO(mapping/type): declare Token type
export type TokenType = any;
