import { Mapping } from './config-new'
import {
  getCurrentComponentMappingsVariants,
  hasComponentAppearance,
  hasAppearanceVariant,
  hasVariantPropKey,
} from '../service';
import {
  AppearanceType,
  ComponentMappingType,
  VariantGroupType,
} from '../component'

describe('@theme: service methods check', () => {

  it('get current component mappings variants', () => {
    const mapping: ComponentMappingType = Mapping.Test;
    const componentPropsWithTargets: object = {
      appearance: 'bold',
      checked: false,
      onChange: () => 1,
      size: 'small',
      status: 'info',
      style: { marginHorizontal: 4, },
    };
    const componentPropsWithoutTargets: object = {
      checked: false,
      onChange: () => 1,
      style: { marginHorizontal: 4, },
    };

    expect(getCurrentComponentMappingsVariants(mapping, componentPropsWithTargets)).toEqual (['small', 'info']);
    expect(getCurrentComponentMappingsVariants(mapping, componentPropsWithoutTargets)).toEqual ([]);
  });

  it('has component appearance', () => {
    const appearance: string = 'test';
    const notAppearance: string = undefined;
    const emptyAppearance: string = '';

    expect(hasComponentAppearance(appearance)).toBe(true);
    expect(hasComponentAppearance(notAppearance)).toBe(undefined);
    expect(hasComponentAppearance(emptyAppearance)).toBe('');
  });

  it('has appearance variant', () => {
    const appearanceWithVariant: AppearanceType = Mapping.Test.appearance.default;
    const appearanceWithoutVariant: AppearanceType = Mapping.Test.appearance.custom;

    expect(hasAppearanceVariant(appearanceWithVariant)).toBe(true);
    expect(hasAppearanceVariant(appearanceWithoutVariant)).toBe(false);
  });

  it('has variant prop key', () => {
    const variantGroup: VariantGroupType = Mapping.Test.appearance.default.variant;

    expect(hasVariantPropKey(variantGroup, 'size')).toBe(true);
    expect(hasVariantPropKey(variantGroup, '')).toBe(false);
    expect(hasVariantPropKey(variantGroup, null)).toBe(false);
  });

});
