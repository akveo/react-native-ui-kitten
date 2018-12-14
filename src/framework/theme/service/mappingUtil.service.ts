import {
  ThemeMappingType,
  VariantType,
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
 * @param tokens: TokenType - theme tokens
 *
 * @return TokenType if presents in tokens, undefined otherwise
 */
export function getThemeMappingToken(token: string, tokens: TokenType): TokenType | undefined {
  if (tokens[token] === undefined) {
    return undefined;
  }
  const value = {};
  value[token] = tokens[token];

  return value;
}

/**
 * @param variant: string - variant name. Default is 'default'
 * @param mapping: ThemeMappingType - component mapping configuration
 * @param state: string - variant state name. Default is `undefined`
 *
 * @return variant if presents in mapping, undefined otherwise
 */
export function getComponentVariant(variant: string,
                                    mapping: ThemeMappingType,
                                    state?: string): any | undefined {

  const componentVariant: VariantType = mapping.variants[variant];
  if (componentVariant === undefined) {
    return undefined;
  }
  const { state: variantStates, ...variantParameters } = componentVariant;

  return state === undefined ? variantParameters : variantStates && variantStates[state];
}

/**
 * @param parameter: string - parameter name.
 * @param variant: string - variant name.
 * @param mapping: ThemeMappingType - component mapping configuration
 * @param state: string - variant state name
 *
 * @return parameterMapping if presents in variant, undefined otherwise
 */
export function getParameterMapping(parameter: string,
                                    variant: string,
                                    mapping: ThemeMappingType,
                                    state?: string): any | undefined {

  const componentVariant = getComponentVariant(variant, mapping, state);
  return componentVariant && componentVariant[parameter];
}

/**
 * @param parameter: string - parameter name.
 * @param variant: string - variant name.
 * @param mapping: ThemeMappingType - component mapping configuration
 * @param tokens: TokenType - theme tokens
 * @param state: string - variant state name
 *
 * @return theme token if presents in variant, undefined otherwise
 */
export function getParameterValue(parameter: string,
                                  variant: string,
                                  mapping: ThemeMappingType,
                                  tokens: TokenType,
                                  state?: string): any | undefined {

  const parameterMapping = getParameterMapping(parameter, variant, mapping, state);
  return parameterMapping && getThemeMappingToken(parameterMapping, tokens);
}
