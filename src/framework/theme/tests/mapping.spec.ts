import { mapping } from './config';
import * as Service from '../service/mappingUtil.service';

describe('@mapping: service methods checks', () => {

  const { Test: testMapping } = mapping;

  const json = (object: any) => JSON.stringify(object);

  it('finds appearance mapping properly', () => {
    const defaultMapping = Service.getAppearanceMapping(testMapping, 'default');
    const customMapping = Service.getAppearanceMapping(testMapping, 'custom');
    const undefinedMapping = Service.getAppearanceMapping(testMapping, 'undefined');

    expect(json(defaultMapping)).toEqual(json(testMapping.appearance.default.mapping));
    expect(json(customMapping)).toEqual(json(testMapping.appearance.custom.mapping));
    expect(undefinedMapping).toBeUndefined();
  });

  it('finds variant mapping properly', () => {
    const variantMapping = Service.getVariantMapping(testMapping,
      'default',
      'info');
    const withUndefinedAppearance = Service.getVariantMapping(testMapping,
      'undefined',
      'info');
    const withUndefinedVariant = Service.getVariantMapping(testMapping,
      'default',
      'undefined');

    expect(json(variantMapping)).toEqual(json(testMapping.appearance.default.variant.status.info.mapping));
    expect(withUndefinedAppearance).toBeUndefined();
    expect(withUndefinedVariant).toBeUndefined();
  });

  it('finds mapping state properly', () => {
    const appearanceMapping = testMapping.appearance.default.mapping;
    const variantMapping = testMapping.appearance.default.variant.status.info.mapping;

    const appearanceState = Service.getMappingState(appearanceMapping, 'checked');
    const variantState = Service.getMappingState(variantMapping, 'checked');
    const undefinedAppearanceState = Service.getMappingState(appearanceMapping, 'undefined');
    const undefinedVariantState = Service.getMappingState(variantMapping, 'undefined');

    expect(json(appearanceState)).toEqual(json(appearanceMapping.state.checked));
    expect(json(variantState)).toEqual(json(variantMapping.state.checked));
    expect(undefinedAppearanceState).toBeUndefined();
    expect(undefinedVariantState).toBeUndefined();
  });

});
