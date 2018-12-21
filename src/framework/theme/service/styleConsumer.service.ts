import {
  ComponentMappingType,
  VARIANT_DEFAULT,
} from '@rk-kit/theme';
import {
  AppearanceType,
  VariantGroupType,
} from '../component';
import { getAppearance } from './';
import { Props } from '../component/style/styleConsumer.component';

export const VARIANT_KEY_NAME: string = 'variant';

export function getCurrentComponentMappingsVariants<P extends Props>(
                                                    mapping: ComponentMappingType,
                                                    componentProps: P): string[] {
  const defaultAppearance: AppearanceType = getAppearance(mapping, VARIANT_DEFAULT);
  const currentAppearance: AppearanceType = hasComponentAppearance(componentProps.appearance) ?
    getAppearance(mapping, componentProps.appearance) : getAppearance(mapping, VARIANT_DEFAULT);
  const matchedVariantsPropsKeys: string[] = Object.keys(componentProps)
    .map((key: string) => {
      if (hasAppearanceMappingPropKey(currentAppearance, key)) {
        return key;
      } else if (hasAppearanceMappingPropKey(defaultAppearance, key)) {
        return key;
      }
    })
    .filter(String);

  return Object.keys(componentProps)
    .filter((propsKey: string) =>
      matchedVariantsPropsKeys.some((foundKey: string) => foundKey === propsKey))
    .map((key: string) => componentProps[key])
    .filter(String);
}

export function hasComponentAppearance(appearanceProp: string): boolean {
  return appearanceProp && appearanceProp.length !== 0;
}

function hasAppearanceMappingPropKey(appearance: AppearanceType, key: string): boolean {
  return hasAppearanceVariant(appearance) && hasVariantPropKey(appearance[VARIANT_KEY_NAME], key)
}

export function hasAppearanceVariant(appearance: AppearanceType): boolean {
  return appearance && appearance.hasOwnProperty(VARIANT_KEY_NAME)
}

export function hasVariantPropKey(variant: VariantGroupType, propKey: string): boolean {
  return Object.keys(variant).some((variantKey: string) => variantKey === propKey)
}
