module.exports = {
  preset: 'react-native',
  cacheDirectory: './dist/jest/cache',
  coverageDirectory: './dist/jest/coverage',
  snapshotResolver: '<rootDir>/jest.config.snapshot',
  moduleNameMapper: {
    "^@ui-kitten/*": "<rootDir>/src/$1",
    "^@kitten/*": "<rootDir>/src/framework/$1",
    "^react-native-ui-kitten": "<rootDir>/src/framework/$1",
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/src/playground/',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/dist',
    '<rootDir>/docs',
  ],
};
