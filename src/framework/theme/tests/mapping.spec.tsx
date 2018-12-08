import React from 'react';
import { ThemeMappingType } from '../component';
import {
  getComponentThemeMapping,
  getComponentMappings,
  getComponentVariant,
  getThemeMappingToken,
  getVariantTokens,
} from '../service';
import * as config from './config';

describe('@mapping: service methods checks', () => {

  const mappings: ThemeMappingType[] = [config.themeMappings.test, config.themeMappings.mock];

  it('finds mappings properly', async () => {
    const componentMappings = getComponentThemeMapping('Test', mappings);

    expect(componentMappings).not.toBeNull();
    expect(componentMappings).not.toBeUndefined();
    expect(JSON.stringify(componentMappings)).toEqual(JSON.stringify(config.themeMappings.test));
  });

  it('finds variant properly', async () => {
    const componentVariant = getComponentVariant('default', config.themeMappings.test);

    expect(componentVariant).not.toBeNull();
    expect(componentVariant).not.toBeUndefined();
    expect(JSON.stringify(componentVariant)).toEqual(JSON.stringify(config.variants.testDefault));
  });

  it('finds mappings properly', async () => {
    const componentMappings = getComponentMappings(config.themeMappings.test);

    expect(componentMappings).not.toBeNull();
    expect(componentMappings).not.toBeUndefined();
    expect(JSON.stringify(componentMappings)).toEqual(JSON.stringify(config.mappings.testDefault));
  });

  it('finds token properly', async () => {
    const mappingToken = getThemeMappingToken('backgroundColorTestDefault', config.theme);

    expect(mappingToken).not.toBeNull();
    expect(mappingToken).not.toBeUndefined();
    expect(mappingToken).not.toEqual(config.values.backgroundDefault);
  });

  it('finds mapping tokens properly', async () => {
    const variantTokens = getVariantTokens(config.theme, config.themeMappings.test);

    expect(variantTokens.backgroundColorTestDefault).not.toBeNull();
    expect(variantTokens.backgroundColorTestDefault).not.toBeUndefined();
    expect(variantTokens.textColorTestDefault).not.toBeNull();
    expect(variantTokens.textColorTestDefault).not.toBeUndefined();
  });

});
