import { Mapping } from './config-new';
import * as Service from '../service/mappingUtil.service';

describe('@mapping: service methods checks', () => {

  const { Test: testMapping } = Mapping;

  it('finds appearance mapping properly', () => {
    const defaultMapping = Service.getAppearanceMapping(testMapping, 'default');
    const customMapping = Service.getAppearanceMapping(testMapping, 'custom');
    const undefinedMapping = Service.getAppearanceMapping(testMapping, 'undefined');

    expect(JSON.stringify(defaultMapping)).toEqual(JSON.stringify(testMapping.appearance.default.mapping));
    expect(JSON.stringify(customMapping)).toEqual(JSON.stringify(testMapping.appearance.custom.mapping));
    expect(undefinedMapping).toBeUndefined();
  });

  it('finds variant mapping properly', () => {
    const variantMapping = Service.getVariantMapping(testMapping,
      'default',
      'status',
      'info');
    const withUndefinedAppearance = Service.getVariantMapping(testMapping,
      'undefined',
      'status',
      'info');
    const withUndefinedGroup = Service.getVariantMapping(testMapping,
      'default',
      'undefined',
      'info');
    const withUndefinedVariant = Service.getVariantMapping(testMapping,
      'default',
      'status',
      'undefined');

    const expectedValue = testMapping.appearance.default.variant.status.info.mapping;

    expect(JSON.stringify(variantMapping)).toEqual(JSON.stringify(expectedValue));
    expect(withUndefinedAppearance).toBeUndefined();
    expect(withUndefinedGroup).toBeUndefined();
    expect(withUndefinedVariant).toBeUndefined();
  });

  it('finds mapping state properly', () => {
    const appearanceMapping = testMapping.appearance.default.mapping;
    const variantMapping = testMapping.appearance.default.variant.status.info.mapping;

    const appearanceState = Service.getMappingState(appearanceMapping, 'checked');
    const variantState = Service.getMappingState(variantMapping, 'checked');
    const undefinedAppearanceState = Service.getMappingState(appearanceMapping, 'undefined');
    const undefinedVariantState = Service.getMappingState(variantMapping, 'undefined');

    expect(JSON.stringify(appearanceState)).toEqual(JSON.stringify(appearanceMapping.state.checked));
    expect(JSON.stringify(variantState)).toEqual(JSON.stringify(variantMapping.state.checked));
    expect(undefinedAppearanceState).toBeUndefined();
    expect(undefinedVariantState).toBeUndefined();
  });

  // it('finds mappings properly', async () => {
  //   const componentMappings = getComponentMapping(config.mappings, 'Test');
  //   const undefinedMappings = getComponentMapping(config.mappings, 'Undefined');
  //
  //   expect(JSON.stringify(componentMappings)).toEqual(JSON.stringify(config.mappings.Test));
  //   expect(undefinedMappings).toBeUndefined();
  // });

  // it('finds variant properly', async () => {
  //   const componentVariant = getComponentVariant(config.mappings.Test, 'default');
  //   const componentStateVariant = getComponentVariant(config.mappings.Test, 'default', 'active');
  //   const undefinedVariant = getComponentVariant(config.mappings.Test, 'undefined');
  //   const undefinedStateVariant = getComponentVariant(config.mappings.Test, 'default', 'undefined');
  //
  //   const { state: variantState, ...variant } = config.mappings.Test.variants.default;
  //
  //   expect(JSON.stringify(componentVariant)).toEqual(JSON.stringify(variant));
  //   expect(JSON.stringify(componentStateVariant)).toEqual(JSON.stringify(variantState.active));
  //   expect(undefinedVariant).toBeUndefined();
  //   expect(undefinedStateVariant).toBeUndefined();
  // });

});
