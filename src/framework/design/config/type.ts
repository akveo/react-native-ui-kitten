export interface DesignType {
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

// TODO(design/type): declare Token type
export type TokenType = any;
