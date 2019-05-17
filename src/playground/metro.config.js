const path = require('path');

const kittenPath = path.resolve('../framework');

// FIXME: Resolve `transform[stderr]: Could not resolve` command-line warnings.
// FIXME: Reproducible when starting with clearing cache (npm start -- -c)

const productionConfig = {
  mappingPath: path.resolve('./node_modules/@eva/eva'),
  themePath: path.resolve('./node_modules/@eva/theme-eva'),
};

const developmentConfig = {
  mappingPath: path.resolve(__dirname, '../../../eva/packages/mapping/eva'),
  themePath: path.resolve(__dirname, '../../../eva/packages/theme/eva'),
};

const environment = {
  prod: productionConfig,
  dev: developmentConfig,
};

function envWatchFolders(env) {
  return [
    env.mappingPath,
    env.themePath,
  ];
}

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
    ...envWatchFolders(environment.prod),
    path.resolve(kittenPath, 'ui'),
    path.resolve(kittenPath, 'theme'),

    // FIXME(playground): unable to resolve
    path.resolve(__dirname, '../../node_modules/@eva/processor-kitten'),
    path.resolve(__dirname, '../../node_modules/@babel'),
    path.resolve(__dirname, '../../node_modules/hoist-non-react-statics'),
    path.resolve(__dirname, '../../node_modules/react-is'),
    path.resolve(__dirname, '../../node_modules/lodash.merge'),
  ],
};

