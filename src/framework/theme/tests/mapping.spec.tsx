import * as config from './config';
import {
  getComponentThemeMapping,
  getComponentVariant,
  getThemeMappingToken,
  getVariantTokens,
} from '../service';

describe('@mapping: service methods checks', () => {

  it('finds mappings properly', async () => {
    const componentMappings = getComponentThemeMapping('Test', config.mappings);

    expect(componentMappings).not.toBeNull();
    expect(componentMappings).not.toBeUndefined();
    expect(JSON.stringify(componentMappings)).toEqual(JSON.stringify(config.mappings.Test));
  });

  it('finds variant properly', async () => {
    const componentVariant = getComponentVariant('default', config.mappings.Test);

    expect(componentVariant).not.toBeNull();
    expect(componentVariant).not.toBeUndefined();
    expect(JSON.stringify(componentVariant)).toEqual(JSON.stringify(config.mappings.Test.variants.default));
  });

  it('finds token properly', async () => {
    const mappingToken = getThemeMappingToken('background-color-test-default', config.theme);

    expect(mappingToken).not.toBeNull();
    expect(mappingToken).not.toBeUndefined();
    expect(mappingToken).not.toEqual(config.values.backgroundDefault);
  });

  it('finds default mapping tokens properly', async () => {
    const variantTokens = getVariantTokens(config.theme, config.mappings.Test);

    expect(variantTokens['background-color-test-default']).not.toBeNull();
    expect(variantTokens['background-color-test-default']).not.toBeUndefined();
    expect(variantTokens['text-color-test-default']).not.toBeNull();
    expect(variantTokens['text-color-test-default']).not.toBeUndefined();
  });

});
