import * as config from './config';
import {
  getComponentThemeMapping,
  getComponentVariant,
  getParameterValue,
  getThemeMappingToken,
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
    const componentStateVariant = getComponentVariant('default', config.mappings.Test, 'active');
    const undefinedVariant = getComponentVariant('undefined', config.mappings.Test);
    const undefinedStateVariant = getComponentVariant('default', config.mappings.Test, 'undefined');

    expect(componentVariant).not.toBeNull();
    expect(componentVariant).not.toBeUndefined();
    expect(componentStateVariant).not.toBeNull();
    expect(componentStateVariant).not.toBeUndefined();
    expect(undefinedVariant).toBeUndefined();
    expect(undefinedStateVariant).toBeUndefined();

    const { state: variantState, ...variant } = config.mappings.Test.variants.default;
    expect(JSON.stringify(componentVariant)).toEqual(JSON.stringify(variant));
    expect(JSON.stringify(componentStateVariant)).toEqual(JSON.stringify(variantState.active));
  });

  it('finds parameter value properly', async () => {
    const parameterValue = getParameterValue(
      'backgroundColor',
      'default',
      config.mappings.Test,
      config.theme,
    );
    const stateParameterValue = getParameterValue(
      'backgroundColor',
      'default',
      config.mappings.Test,
      config.theme,
      'active',
    );
    const undefinedValue = getParameterValue(
      'undefined',
      'default',
      config.mappings.Test,
      config.theme,
    );
    const undefinedStateValue = getParameterValue(
      'backgroundColor',
      'default',
      config.mappings.Test,
      config.theme,
      'undefined',
    );

    expect(parameterValue).not.toBeNull();
    expect(parameterValue).not.toBeUndefined();
    expect(stateParameterValue).not.toBeNull();
    expect(stateParameterValue).not.toBeUndefined();
    expect(undefinedValue).toBeUndefined();
    expect(undefinedStateValue).toBeUndefined();
  });

  it('finds token properly', async () => {
    const mappingToken = getThemeMappingToken('backgroundColorTestDefault', config.theme);
    const undefinedToken = getThemeMappingToken('undefined', config.theme);

    expect(mappingToken).not.toBeNull();
    expect(mappingToken).not.toBeUndefined();
    expect(mappingToken).not.toEqual(config.values.backgroundDefault);
    expect(undefinedToken).toBeUndefined();
  });

});
