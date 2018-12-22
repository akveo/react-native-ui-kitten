import { Mapping as mapping } from './config-new';
import {
  StyleConsumerService,
  APPEARANCE_DEFAULT,
} from '../service';

describe('@style: service methods check', () => {

  const { Test: testMapping } = mapping;
  const service: StyleConsumerService = new StyleConsumerService();

  it('retrieves variant prop keys properly', () => {
    const defaultAppearanceKeys = service.getVariantPropKeys(testMapping, {
      appearance: APPEARANCE_DEFAULT,
      checked: false,
      status: 'info',
      size: 'small',
    });
    const customAppearanceKeys = service.getVariantPropKeys(testMapping, {
      appearance: 'custom',
      checked: false,
      size: 'small',
    });
    const undefinedAppearanceKeys = service.getVariantPropKeys(testMapping, {
      appearance: 'undefined',
      checked: false,
      status: 'info',
    });

    expect(defaultAppearanceKeys).toEqual(['info', 'small']);
    expect(customAppearanceKeys).toEqual(['small']);
    expect(undefinedAppearanceKeys).toEqual(['info']);
  });

});
