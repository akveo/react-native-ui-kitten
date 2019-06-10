const path = require('path');
const Config = require('../../config');

module.exports = {
  resolver: {
    sourceExts: [
      'js',
      'ts',
      'tsx',
    ],
    extraNodeModules: {
      '@babel/runtime': path.resolve(__dirname, './node_modules/@babel/runtime'),
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-native': path.resolve(__dirname, './node_modules/react-native'),
    },
  },
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(Config.KITTEN_PATH, 'theme'),
    path.resolve(Config.KITTEN_PATH, 'ui'),
    path.resolve(Config.MAPPING_PATH),
    path.resolve(Config.PROCESSOR_PATH),
    path.resolve(__dirname, '../../node_modules/@babel'),
    path.resolve(__dirname, '../../node_modules/hoist-non-react-statics'),
    path.resolve(__dirname, '../../node_modules/react-is'),
    path.resolve(__dirname, '../../node_modules/lodash.merge'),
  ],
};
