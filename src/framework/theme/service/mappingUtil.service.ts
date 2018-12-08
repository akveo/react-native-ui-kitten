import {
  ThemeMappingType,
  VariantType,
  MappingType,
  TokenType,
} from '../component';

export const VARIANT_DEFAULT = 'default';

/**
 * @param component: string - component name. Using displayName is recommended
 * @param mapping: ThemeMappingType[] - theme mapping configuration array
 *
 * @return ThemeMappingType if presents in theme mapping, undefined otherwise
 */
export function getComponentThemeMapping(component: string, mapping: ThemeMappingType[]): ThemeMappingType | undefined {
  return mapping.find(value => value.name === component);
}

/**
 * @param token: string - theme mapping token name
 * @param tokens: TokenType[] - theme mapping tokens array
 *
 * @return TokenType if presents in tokens, undefined otherwise
 */
export function getThemeMappingToken(token: string, tokens: TokenType): TokenType | undefined {
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
 * @param mapping: ThemeMappingType - component mapping configuration
 *
 * @return VariantType if presents in mapping, undefined otherwise
 */
export function getComponentVariant(name: string, mapping: ThemeMappingType): VariantType | undefined {
  return mapping.variants.find(value => value.name === name);
}

/**
 * @param mapping: ThemeMappingType - component mapping configuration
 * @param variant: string - variant name. Default is 'default'
 *
 * @return MappingType[] if presents in variant, undefined otherwise
 */
export function getComponentMappings(mapping: ThemeMappingType,
                                     variant: string = VARIANT_DEFAULT): MappingType[] | undefined {
  const componentVariant = getComponentVariant(variant, mapping);
  return componentVariant && componentVariant.mapping;
}

/**
 * @param tokens: TokenType[] - theme mapping tokens array
 * @param mapping: ThemeMappingType - component mapping configuration
 * @param variant: string - variant name. Default is 'default'
 *
 * @return TokenType[] specific for component's variant if presents in variant, undefined otherwise
 */
export function getVariantTokens(tokens: TokenType,
                                 mapping: ThemeMappingType,
                                 variant: string = VARIANT_DEFAULT): TokenType | undefined {

  const assignParameter = (origin: TokenType, prop: MappingType) => {
    return {
      ...origin,
      ...getThemeMappingToken(prop.token, tokens),
    };
  };
  const componentMappings = getComponentMappings(mapping, variant);
  return componentMappings.reduce(assignParameter, {});
}
