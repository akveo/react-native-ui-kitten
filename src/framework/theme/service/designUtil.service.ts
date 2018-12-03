import {
  DesignType,
  VariantType,
  MappingType,
  TokenType,
} from '@rk-kit/design';

export const defaultVariant = 'default';

/**
 * @param component: string - component name. Using displayName is recommended
 * @param design: DesignType[] - design configuration array
 *
 * @return DesignType if presents in design, undefined otherwise
 */
export function getComponentDesign(component: string, design: DesignType[]): DesignType {
  return design.find(value => value.name === component);
}

/**
 * @param token: string - design token name
 * @param tokens: TokenType[] - design tokens array
 *
 * @return TokenType if presents in tokens, undefined otherwise
 */
export function getDesignToken(token: string, tokens: TokenType): TokenType | undefined {
  const value = {};
  if (tokens[token] !== undefined) {
    value[token] = tokens[token];
    return value;
  } else {
    return undefined;
  }
}

/**
 * @param name: string - variant name. Default is 'default'
 * @param design: DesignType - component design configuration
 *
 * @return VariantType if presents in design, undefined otherwise
 */
export function getComponentVariant(name: string, design: DesignType): VariantType | undefined {
  return design.variants.find(value => value.name === name);
}

/**
 * @param design: DesignType - component design configuration
 * @param variant: string - variant name. Default is 'default'
 *
 * @return MappingType[] if presents in variant, undefined otherwise
 */
export function getComponentMappings(design: DesignType, variant: string = defaultVariant): MappingType[] | undefined {
  const componentVariant = getComponentVariant(variant, design);
  return componentVariant && componentVariant.mapping;
}

/**
 * @param tokens: TokenType[] - design tokens array
 * @param design: DesignType - component design configuration
 * @param variant: string - variant name. Default is 'default'
 *
 * @return TokenType[] specific for component's variant if presents in variant, undefined otherwise
 */
export function getVariantTokens(tokens: TokenType,
                                 design: DesignType,
                                 variant: string = defaultVariant): TokenType | undefined {

  const assignParameter = (origin: TokenType, prop: MappingType) => {
    return {
      ...origin,
      ...getDesignToken(prop.token, tokens),
    };
  };
  const componentMappings = getComponentMappings(design, variant);
  return componentMappings.reduce(assignParameter, {});
}
