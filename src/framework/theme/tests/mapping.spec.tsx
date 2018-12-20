import * as config from './config';
import {
  getComponentThemeMapping,
  getComponentVariant,
} from '../service';

describe('@mapping: service methods checks', () => {

  it('finds mappings properly', async () => {
    const componentMappings = getComponentThemeMapping('Test', config.mappings);
    const undefinedMappings = getComponentThemeMapping('Undefined', config.mappings);

    expect(JSON.stringify(componentMappings)).toEqual(JSON.stringify(config.mappings.Test));
    expect(undefinedMappings).toBeUndefined();
  });

  it('finds variant properly', async () => {
    const componentVariant = getComponentVariant('default', config.mappings.Test);
    const componentStateVariant = getComponentVariant('default', config.mappings.Test, 'active');
    const undefinedVariant = getComponentVariant('undefined', config.mappings.Test);
    const undefinedStateVariant = getComponentVariant('default', config.mappings.Test, 'undefined');

    const { state: variantState, ...variant } = config.mappings.Test.variants.default;

    expect(JSON.stringify(componentVariant)).toEqual(JSON.stringify(variant));
    expect(JSON.stringify(componentStateVariant)).toEqual(JSON.stringify(variantState.active));
    expect(undefinedVariant).toBeUndefined();
    expect(undefinedStateVariant).toBeUndefined();
  });

});
