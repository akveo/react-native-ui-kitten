const path = require('path');

const srcRoot = path.resolve(__dirname, '..');

const evaModules = {
  '@ui-kitten/eva': path.resolve(srcRoot, 'eva'),
  '@ui-kitten/material': path.resolve(srcRoot, 'material'),
  '@ui-kitten/processor': path.resolve(srcRoot, 'processor'),
};

const frameworkModules = {
  '@ui-kitten/components': path.resolve(srcRoot, 'components'),
  '@ui-kitten/date-fns': path.resolve(srcRoot, 'date-fns'),
  '@ui-kitten/eva-icons': path.resolve(srcRoot, 'eva-icons'),
  '@ui-kitten/moment': path.resolve(srcRoot, 'moment'),
};

const moduleResolverConfig = {
  root: path.resolve('./'),
  alias: {
    ...evaModules,
    ...frameworkModules,
  },
};

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', moduleResolverConfig],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      'react-native-reanimated/plugin', // Must be last (includes worklets plugin)
    ],
  };
};
