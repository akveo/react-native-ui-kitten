import { Mapping } from './config-new'
import { StyleConsumerService } from '../service';
import {
  AppearanceType,
  ComponentMappingType,
  VariantGroupType,
} from '../component'

describe('@theme: service methods check', () => {

  const service: StyleConsumerService = new StyleConsumerService();

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

    expect(service.getCurrentComponentMappingsVariants(mapping, componentPropsWithTargets))
      .toEqual (['small', 'info']);
    expect(service.getCurrentComponentMappingsVariants(mapping, componentPropsWithoutTargets)).toEqual ([]);
  });

  it('has component appearance', () => {
    const appearance: string = 'test';
    const notAppearance: string = undefined;
    const emptyAppearance: string = '';

    expect(service.hasComponentAppearance(appearance)).toBe(true);
    expect(service.hasComponentAppearance(notAppearance)).toBe(undefined);
    expect(service.hasComponentAppearance(emptyAppearance)).toBe('');
  });

  it('has appearance variant', () => {
    const appearanceWithVariant: AppearanceType = Mapping.Test.appearance.default;
    const appearanceWithoutVariant: AppearanceType = Mapping.Test.appearance.custom;

    expect(service.hasAppearanceVariant(appearanceWithVariant)).toBe(true);
    expect(service.hasAppearanceVariant(appearanceWithoutVariant)).toBe(false);
  });

  it('has variant prop key', () => {
    const variantGroup: VariantGroupType = Mapping.Test.appearance.default.variant;

    expect(service.hasVariantPropKey(variantGroup, 'size')).toBe(true);
    expect(service.hasVariantPropKey(variantGroup, '')).toBe(false);
    expect(service.hasVariantPropKey(variantGroup, null)).toBe(false);
  });

});
