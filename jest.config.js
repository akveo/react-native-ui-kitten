const { defaults: tsJestConfig } = require('ts-jest/presets');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const jestConfig = require('./tsconfig.jest');

module.exports = {
  ...tsJestConfig,
  preset: 'react-native',
  transform: {
    ...tsJestConfig.transform,
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsConfig: './tsconfig.jest.json',
    },
  },
  cacheDirectory: './dist/jest/cache',
  coverageDirectory: './dist/jest/coverage',
  snapshotResolver: '<rootDir>/jest.config.snapshot',
  moduleNameMapper: pathsToModuleNameMapper(jestConfig.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  modulePathIgnorePatterns: [
    '<rootDir>/src/playground/',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/dist',
    '<rootDir>/node_modules',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-cookies|eva)/)'
  ],
};
