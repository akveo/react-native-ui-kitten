const path = require('path');

const kittenPath = path.resolve('../framework');
const evaPath = path.resolve(__dirname, '../../../eva/packages');

module.exports = {
  resolver: {
    extraNodeModules: {
      '@babel/runtime': path.resolve(__dirname, './node_modules/@babel/runtime'),
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-native': path.resolve(__dirname, './node_modules/react-native'),
    },
    sourceExts: [
      'js',
      'ts',
      'tsx',
    ],
  },
  transformer: {
    babelTransformerPath: require.resolve('react-native-typescript-transformer'),
  },
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(kittenPath, 'ui'),
    path.resolve(kittenPath, 'theme'),
    path.resolve(evaPath, 'mapping/eva'),
    path.resolve(evaPath, 'theme/eva'),

    // FIXME(playground): unable to resolve
    path.resolve(__dirname, '../../node_modules/@eva/processor-kitten'),
    path.resolve(__dirname, '../../node_modules/@babel'),
    path.resolve(__dirname, '../../node_modules/hoist-non-react-statics'),
    path.resolve(__dirname, '../../node_modules/react-is'),
    path.resolve(__dirname, '../../node_modules/lodash.merge'),
  ],
};

