import {
  ThemeMappingType,
  TokenType,
} from '../component';

export const VARIANT_DEFAULT = 'default';

/**
 * @param component: string - component name. Using displayName is recommended
 * @param mapping: ThemeMappingType[] - theme mapping configuration array
 *
 * @return ThemeMappingType if presents in mapping, undefined otherwise
 */
export function getComponentThemeMapping(component: string, mapping: any): ThemeMappingType | undefined {
  return mapping[component];
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
 * @param variant: string - variant name. Default is 'default'
 * @param mapping: ThemeMappingType - component mapping configuration
 *
 * @return variant if presents in mapping, undefined otherwise
 */
export function getComponentVariant(variant: string, mapping: ThemeMappingType): any | undefined {
  return mapping.variants[variant];
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

  const componentVariant = getComponentVariant(variant, mapping);
  const assignParameter = (origin: TokenType, parameter: any) => {
    return {
      ...origin,
      ...getThemeMappingToken(componentVariant[parameter], tokens),
    };
  };
  return Object.keys(componentVariant).reduce(assignParameter, {});
}
