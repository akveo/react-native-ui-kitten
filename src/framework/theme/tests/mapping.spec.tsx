import * as config from './config';
import {
  getThemeMapping,
  getMappingVariant,
} from '../service';

describe('@mapping: service methods checks', () => {

  it('finds mappings properly', async () => {
    const componentMappings = getThemeMapping('Test', config.mappings);
    const undefinedMappings = getThemeMapping('Undefined', config.mappings);

    expect(JSON.stringify(componentMappings)).toEqual(JSON.stringify(config.mappings.Test));
    expect(undefinedMappings).toBeUndefined();
  });

  it('finds variant properly', async () => {
    const mapping = config.mappings.Test;
    const { state: variantState, ...variant } = mapping.variants.default;

    const componentVariant = getMappingVariant(mapping, 'default');
    const componentStateVariant = getMappingVariant(mapping, 'default', 'active');
    const undefinedVariant = getMappingVariant(mapping, 'undefined');
    const undefinedStateVariant = getMappingVariant(mapping, 'default', 'undefined');

    expect(JSON.stringify(componentVariant)).toEqual(JSON.stringify(variant));
    expect(JSON.stringify(componentStateVariant)).toEqual(JSON.stringify(variantState.active));
    expect(undefinedVariant).toBeUndefined();
    expect(undefinedStateVariant).toBeUndefined();
  });

});
