import React from 'react';
import * as Service from './theme.service';
import * as config from './theme.spec.config';

describe('@theme: service method checks', () => {

  it('finds theme value properly', async () => {
    const themeValue = Service.getThemeValue('grayPrimary', config.theme);
    const undefinedValue = Service.getThemeValue('undefined', config.theme);

    expect(themeValue).toEqual(config.theme.grayPrimary);
    expect(undefinedValue).toBeUndefined();
  });

});
