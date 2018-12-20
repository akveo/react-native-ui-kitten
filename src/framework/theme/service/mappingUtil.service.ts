import {
  ThemeMappingType,
  VariantType,
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
