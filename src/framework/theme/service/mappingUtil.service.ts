import { ThemeMappingType, TokenType } from '../component';

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
 * @param tokens: TokenType - theme tokens
 *
 * @return TokenType if presents in tokens, undefined otherwise
 */
export function getThemeMappingToken(token: string, tokens: TokenType): TokenType | undefined {
  if (tokens[token] !== undefined) {
    const value = {};
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
 * @param parameter: string - parameter name.
 * @param variant: string - variant name. Default is 'default'
 * @param mapping: ThemeMappingType - component mapping configuration
 *
 * @return parameterMapping if presents in variant, undefined otherwise
 */
export function getParameterMapping(parameter: string,
                                    variant: string,
                                    mapping: ThemeMappingType): any | undefined {

  const componentVariant = getComponentVariant(variant, mapping);
  return componentVariant && componentVariant[parameter];
}

/**
 * @param parameter: string - parameter name.
 * @param variant: string - variant name.
 * @param mapping: ThemeMappingType - component mapping configuration
 * @param tokens: TokenType - theme tokens
 *
 * @return theme token if presents in variant, undefined otherwise
 */
export function getParameterValue(parameter: string,
                                  variant: string,
                                  mapping: ThemeMappingType,
                                  tokens: TokenType): any | undefined {

  const parameterMapping = getParameterMapping(parameter, variant, mapping);
  return parameterMapping && getThemeMappingToken(parameterMapping, tokens);
}

/**
 * @param tokens: TokenType - theme mapping tokens array
 * @param mapping: ThemeMappingType - component mapping configuration
 * @param variant: string - variant name. Default is 'default'
 *
 * @return TokenType specific for component's variant if presents in variant, undefined otherwise
 */
export function getVariantTokens(tokens: TokenType,
                                 mapping: ThemeMappingType,
                                 variant: string = VARIANT_DEFAULT): TokenType | undefined {

  const componentVariant = getComponentVariant(variant, mapping);
  if (componentVariant === undefined) {
    return undefined;
  }
  const assignParameter = (origin: TokenType, parameter: string) => {
    return {
      ...origin,
      ...getParameterValue(parameter, variant, mapping, tokens),
    };
  };
  return Object.keys(componentVariant).reduce(assignParameter, {});
}
