const { defaults: tsJestConfig } = require('ts-jest/presets');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const tsConfig = require('./tsconfig');

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
      tsConfig: './tsconfig.test.json',
    },
  },
  cacheDirectory: './dist/jest/cache',
  coverageDirectory: './dist/jest/coverage',
  snapshotResolver: '<rootDir>/jest.config.snapshot',
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  modulePathIgnorePatterns: [
    '<rootDir>/src/playground/',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/dist',
    '<rootDir>/docs',
  ],
};
