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

export class StyleConsumerService {

  public getCurrentComponentMappingsVariants<P extends Props>(mapping: ComponentMappingType,
                                                              componentProps: P): string[] {
    const defaultAppearance: AppearanceType = getAppearance(mapping, VARIANT_DEFAULT);
    const currentAppearance: AppearanceType = this.hasComponentAppearance(componentProps.appearance) ?
      getAppearance(mapping, componentProps.appearance) : getAppearance(mapping, VARIANT_DEFAULT);
    const matchedVariantsPropsKeys: string[] = Object.keys(componentProps)
      .map((key: string) => {
        if (this.hasAppearanceMappingPropKey(currentAppearance, key)) {
          return key;
        } else if (this.hasAppearanceMappingPropKey(defaultAppearance, key)) {
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

  public hasComponentAppearance(appearanceProp: string): boolean {
    return appearanceProp && appearanceProp.length !== 0;
  }

  private hasAppearanceMappingPropKey(appearance: AppearanceType, key: string): boolean {
    return this.hasAppearanceVariant(appearance) && this.hasVariantPropKey(appearance[VARIANT_KEY_NAME], key)
  }

  public hasAppearanceVariant(appearance: AppearanceType): boolean {
    return appearance && appearance.hasOwnProperty(VARIANT_KEY_NAME)
  }

  public hasVariantPropKey(variant: VariantGroupType, propKey: string): boolean {
    return Object.keys(variant).some((variantKey: string) => variantKey === propKey)
  }

}
