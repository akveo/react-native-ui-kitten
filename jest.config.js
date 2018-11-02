// module.exports = {
//   "preset": "react-native",
//   "moduleFileExtensions": [
//     "ts",
//     "tsx",
//     "js",
//   ],
//   "transform": {
//     // "src\/.*.(js|jsx)$": "babel-jest",
//     "src\/.*.(ts|tsx)$": "ts-jest",
//   },
//   "testRegex": "src\\/.*\\.spec\\.(ts|tsx)$",
// };
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  transform: {
    ...tsjPreset.transform,
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
    }
  },
  //initialize moduleNameMapper for @rk-kit import syntax
};