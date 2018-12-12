import * as config from './config';
import {
  getComponentThemeMapping,
  getComponentVariant,
  getParameterValue,
  getThemeMappingToken,
  getVariantTokens,
} from '../service';

describe('@mapping: service methods checks', () => {

  it('finds mappings properly', async () => {
    const componentMappings = getComponentThemeMapping('Test', config.mappings);
    const undefinedMappings = getComponentThemeMapping('Undefined', config.mappings);

    expect(componentMappings).not.toBeNull();
    expect(componentMappings).not.toBeUndefined();
    expect(JSON.stringify(componentMappings)).toEqual(JSON.stringify(config.mappings.Test));
    expect(undefinedMappings).toBeUndefined();
  });

  it('finds variant properly', async () => {
    const componentVariant = getComponentVariant('default', config.mappings.Test);
    const undefinedVariant = getComponentVariant('undefined', config.mappings.Test);

    expect(componentVariant).not.toBeNull();
    expect(componentVariant).not.toBeUndefined();
    expect(JSON.stringify(componentVariant)).toEqual(JSON.stringify(config.mappings.Test.variants.default));
    expect(undefinedVariant).toBeUndefined();
  });

  it('finds parameter value properly', async () => {
    const parameterValue = getParameterValue('backgroundColor', 'default', config.mappings.Test, config.theme);
    const undefinedValue = getParameterValue('undefined', 'default', config.mappings.Test, config.theme);

    expect(parameterValue).not.toBeNull();
    expect(parameterValue).not.toBeUndefined();
    expect(undefinedValue).toBeUndefined();
  });

  it('finds token properly', async () => {
    const mappingToken = getThemeMappingToken('backgroundColorTestDefault', config.theme);
    const undefinedToken = getThemeMappingToken('undefined', config.theme);

    expect(mappingToken).not.toBeNull();
    expect(mappingToken).not.toBeUndefined();
    expect(mappingToken).not.toEqual(config.values.backgroundDefault);
    expect(undefinedToken).toBeUndefined();
  });

  it('finds default mapping tokens properly', async () => {
    const variantTokens = getVariantTokens(config.theme, config.mappings.Test);
    const undefinedTokens = getVariantTokens(config.theme, config.mappings.Test, 'undefined');

    expect(variantTokens.backgroundColorTestDefault).not.toBeNull();
    expect(variantTokens.backgroundColorTestDefault).not.toBeUndefined();
    expect(variantTokens.textColorTestDefault).not.toBeNull();
    expect(variantTokens.textColorTestDefault).not.toBeUndefined();
    expect(undefinedTokens).toBeUndefined();
  });

});
