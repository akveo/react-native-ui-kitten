import {
  ThemeMappingType,
  ComponentMappingType,
  AppearanceType,
  VariantGroupType,
  MappingType,
  StateType,
} from '../component';

export const VARIANT_DEFAULT = 'default';
export const VARIANT_KEY_NAME: string = 'variant';

/**
 * @param component: string - component name
 * @param mapping: ThemeMappingType - theme mapping configuration object
 *
 * @return ComponentMappingType if presents in mapping, undefined otherwise
 */
export function getComponentMapping(mapping: ThemeMappingType,
                                    component: string): ComponentMappingType | undefined {

  return mapping[component];
}

export function getAppearance(mapping: ComponentMappingType,
                              appearance: string): AppearanceType | undefined {

  return mapping.appearance[appearance];
}

export function getAppearanceVariants(mapping: ComponentMappingType,
                                      appearance: string): VariantGroupType | undefined {

  const appearanceConfig = getAppearance(mapping, appearance);

  return appearanceConfig && appearanceConfig.variant;
}

export function getAppearanceMapping(mapping: ComponentMappingType,
                                     appearance: string): MappingType {

  const appearanceConfig = getAppearance(mapping, appearance);

  return appearanceConfig && appearanceConfig.mapping;
}

export function getVariantMapping(mapping: ComponentMappingType,
                                  appearance: string,
                                  group: string,
                                  variant: string): MappingType | undefined {

  const variantGroupConfig = getAppearanceVariants(mapping, appearance);
  const variantGroup = variantGroupConfig && variantGroupConfig[group];
  const variantConfig = variantGroup && variantGroup[variant];

  return variantConfig && variantConfig.mapping;
}

export function getMappingState(mapping: MappingType,
                                state: string): StateType | undefined {

  return mapping.state && mapping.state[state];
}

export function hasAppearanceMappingPropKey(appearance: AppearanceType, key: string): boolean {
  return hasAppearanceVariant(appearance) && hasVariantPropKey(appearance[VARIANT_KEY_NAME], key)
}

function hasAppearanceVariant(appearance: AppearanceType): boolean {
  return appearance.hasOwnProperty(VARIANT_KEY_NAME)
}

function hasVariantPropKey(variant: VariantGroupType, propKey: string): boolean {
  return Object.keys(variant).some((variantKey: string) => variantKey === propKey)
}

// /**
//  * @param variant: string - variant name. Default is 'default'
//  * @param mapping: ThemeMappingType - component mapping configuration
//  * @param state: string - variant state name. Default is `undefined`
//  *
//  * @return variant if presents in mapping, undefined otherwise
//  */
// export function getComponentVariant(mapping: ComponentMappingType,
//                                     variant: string,
//                                     state?: string): any | undefined {
//
//   const componentVariant: VariantType = mapping.variants[variant];
//   if (componentVariant === undefined) {
//     return undefined;
//   }
//   const { state: variantStates, ...variantParameters } = componentVariant;
//
//   return state === undefined ? variantParameters : variantStates && variantStates[state];
// }
