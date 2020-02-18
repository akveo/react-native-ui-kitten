import * as MetroConfig from '../';
import { EvaConfig } from '../services/eva-config.service';

const evaConfig: EvaConfig = {
  evaPackage: '@eva-design/eva',
  customMappingPath: './path-to/custom-mapping.json',
};

it('should configure metro bundler with default values', () => {
  const { reporter, ...restConfig } = MetroConfig.create(evaConfig);

  expect(reporter).toBeTruthy();
  expect(restConfig).toBeTruthy();
});

it('should configure metro bundler with extended configuration', () => {
  const metroConfig = {
    watchFolders: [
      './path-to/test-dir',
    ],
  };

  const { reporter, watchFolders, ...restConfig } = MetroConfig.create(evaConfig, metroConfig);

  expect(reporter).toBeTruthy();
  expect(watchFolders[0]).toEqual(metroConfig.watchFolders[0]);
  expect(restConfig).toBeTruthy();
});

