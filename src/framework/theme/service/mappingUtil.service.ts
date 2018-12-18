import {
  ThemeMappingType,
  VariantType,
} from '../component';

export const VARIANT_DEFAULT = 'default';

/**
 * @param component: string - component name
 * @param mapping: ThemeMappingType - theme mapping configuration object
 *
 * @return ThemeMappingType if presents in mapping, undefined otherwise
 */
export function getThemeMapping(component: string, mapping: any): ThemeMappingType | undefined {
  return mapping[component];
}

/**
 * @param mapping: ThemeMappingType - component mapping configuration object
 * @param variant: string - variant name
 * @param state: string - variant state name. Optional
 *
 * @return variant mapping or it's state mapping if presents in component mapping, undefined otherwise
 */
export function getMappingVariant(mapping: ThemeMappingType, variant: string, state?: string): any | undefined {
  const componentVariant: VariantType = mapping.variants[variant];
  if (componentVariant === undefined) {
    return undefined;
  }
  const { state: variantStates, ...variantParameters } = componentVariant;

  return state === undefined ? variantParameters : variantStates && variantStates[state];
}
