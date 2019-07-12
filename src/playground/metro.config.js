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
    path.resolve(Config.MODULES_PATH, 'framework'),
    path.resolve(Config.MODULES_PATH, 'framework/theme'),
    path.resolve(Config.MODULES_PATH, 'framework/ui'),
    path.resolve(Config.MODULES_PATH, 'moment'),
    path.resolve(Config.MODULES_PATH, 'date-fns'),
    path.resolve(Config.MAPPING_PATH),
    path.resolve(Config.PROCESSOR_PATH),
    path.resolve(__dirname, '../../node_modules/@babel'),
    path.resolve(__dirname, '../../node_modules/hoist-non-react-statics'),
    path.resolve(__dirname, '../../node_modules/react-is'),
    path.resolve(__dirname, '../../node_modules/lodash.merge'),
    path.resolve(__dirname, '../../node_modules/fecha'),
    path.resolve(__dirname, '../../node_modules/moment'),
    path.resolve(__dirname, '../../node_modules/date-fns'),
  ],
};
