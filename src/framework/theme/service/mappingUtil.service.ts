import {
  ThemeMappingType,
  ComponentMappingType,
  AppearanceType,
  VariantGroupType,
  MappingType,
  StateType,
} from '../component';

export const APPEARANCE_DEFAULT = 'default';

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

export function getAppearanceMapping(mapping: ComponentMappingType,
                                     appearance: string): MappingType | undefined {

  const appearanceConfig = getAppearance(mapping, appearance);

  return appearanceConfig && appearanceConfig.mapping;
}

export function getAppearanceMappingSafe(mapping: ComponentMappingType,
                                         appearance: string,
                                         fallback: MappingType): MappingType {

  return getAppearanceMapping(mapping, appearance) || fallback;
}

export function getAppearanceVariants(mapping: ComponentMappingType,
                                      appearance: string): VariantGroupType | undefined {

  const appearanceConfig = getAppearance(mapping, appearance);

  return appearanceConfig && appearanceConfig.variant;
}

export function getVariantMapping(mapping: ComponentMappingType,
                                  appearance: string,
                                  variant: string): MappingType | undefined {

  const variantGroupConfig = getAppearanceVariants(mapping, appearance);
  const variantGroupName = variantGroupConfig && Object.keys(variantGroupConfig).find(group => {
    return variantGroupConfig[group][variant] !== undefined;
  });
  const variantConfig = variantGroupName && variantGroupConfig[variantGroupName][variant];

  return variantConfig && variantConfig.mapping;
}

export function getVariantMappingSafe(mapping: ComponentMappingType,
                                      appearance: string,
                                      variant: string,
                                      fallback: MappingType): MappingType {

  return getVariantMapping(mapping, appearance, variant) || fallback;
}

export function getMappingState(mapping: MappingType,
                                state: string): StateType | undefined {

  return mapping.state && mapping.state[state];
}
