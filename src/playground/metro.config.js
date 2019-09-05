const path = require('path');
const Config = require('../../config');

/**
 * Resolves Eva modules Haste Map
 */
const evaFolders = [
  path.resolve(Config.MAPPING_PATH),
  path.resolve(Config.PROCESSOR_PATH),
];

/**
 * Resolves UI Kitten modules Haste Map
 */
const moduleFolders = [
  path.resolve(__dirname, '../framework'),
  path.resolve(__dirname, '../framework/theme'),
  path.resolve(__dirname, '../framework/ui'),
  path.resolve(__dirname, '../eva-icons'),
  path.resolve(__dirname, '../moment'),
  path.resolve(__dirname, '../date-fns'),
];

/**
 * Resolves Root Dependencies Haste Map
 */
const rootDependencyFolders = [
  path.resolve(__dirname, '../../node_modules/@babel'),
  path.resolve(__dirname, '../../node_modules/hoist-non-react-statics'),
  path.resolve(__dirname, '../../node_modules/react-is'),
  path.resolve(__dirname, '../../node_modules/lodash.merge'),
  path.resolve(__dirname, '../../node_modules/react-native-eva-icons'),
  path.resolve(__dirname, '../../node_modules/react-native-svg'),
  path.resolve(__dirname, '../../node_modules/fecha'),
  path.resolve(__dirname, '../../node_modules/moment'),
  path.resolve(__dirname, '../../node_modules/date-fns'),
  path.resolve(__dirname, '../../node_modules/@welldone-software/why-did-you-render'),
];

/**
 * Resolves Playground Dependencies Haste Map
 */
const playgroundExtraModules = {
  '@babel/runtime': path.resolve(__dirname, './node_modules/@babel/runtime'),
  'regenerator-runtime': path.resolve(__dirname, './node_modules/regenerator-runtime'),
  'react': path.resolve(__dirname, './node_modules/react'),
  'react-native': path.resolve(__dirname, './node_modules/react-native'),
};

module.exports = {
  resolver: {
    extraNodeModules: {
      ...playgroundExtraModules
    },
  },
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    ...evaFolders,
    ...moduleFolders,
    ...rootDependencyFolders,
  ],
};
