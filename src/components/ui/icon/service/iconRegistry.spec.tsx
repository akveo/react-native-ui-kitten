/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { View } from 'react-native';
import { IconRegistryService } from './iconRegistry.service';
import { IconProvider } from './type';

const TestIcon: IconProvider<any> = {
  toReactElement: (): React.ReactElement => (
    <View/>
  ),
};

describe('@icon-registry: service checks', () => {

  beforeEach(() => {
    IconRegistryService.register(
      {
        name: 'test-icon-pack-1',
        icons: {
          home: TestIcon,
          gear: TestIcon,
        },
      },
      {
        name: 'test-icon-pack-2',
        icons: {
          home: TestIcon,
        },
      },
    );

    IconRegistryService.setDefaultIconPack('test-icon-pack-1');
  });

  it('should register icon pack', () => {
    IconRegistryService.register({
        name: 'additional-icon-pack',
        icons: {
          star: TestIcon,
        },
      },
    );

    expect(IconRegistryService.getIconPack('additional-icon-pack').name).toEqual('additional-icon-pack');
  });

  it('should register icon pack without overriding default', () => {
    IconRegistryService.register({
        name: 'additional-icon-pack',
        icons: {
          home: TestIcon,
        },
      },
    );

    expect(IconRegistryService.getIcon('home').pack).toEqual('test-icon-pack-1');
  });

  it('should throw when setting not registered pack as default', () => {
    expect(() => IconRegistryService.setDefaultIconPack('not-registered-pack')).toThrowError();
  });

  it('should change default icon pack', () => {
    IconRegistryService.setDefaultIconPack('test-icon-pack-2');

    expect(IconRegistryService.getIcon('home').pack).toEqual('test-icon-pack-2');
  });

  it('should set first pack as default', () => {
    expect(IconRegistryService.getIcon('home').pack).toEqual('test-icon-pack-1');
  });

  it('should return icon from default pack', () => {
    expect(IconRegistryService.getIcon('home').pack).toEqual('test-icon-pack-1');
  });

  it('should return icon from specified pack', () => {
    expect(IconRegistryService.getIcon('home', 'test-icon-pack-2').pack).toEqual('test-icon-pack-2');
  });

  it('should throw for getting not registered icon', () => {
    expect(() => IconRegistryService.getIcon('not-registered-pack')).toThrowError();
  });

  it('should throw for getting icon from not registered pack', () => {
    expect(() => IconRegistryService.getIcon('home', 'not-registered-pack')).toThrowError();
  });

});
