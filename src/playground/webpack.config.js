const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const aliases = {
  'react-native-web': path.resolve(__dirname, './node_modules/react-native-web'),
  '@babel/runtime': path.resolve(__dirname, './node_modules/@babel/runtime'),
};
const babelLoaderRules = {
  test: /\.tsx?$/,
  loader: 'babel-loader',
  options: {
    presets: ['babel-preset-expo'],
  },
};
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.resolve.alias = {
    ...config.resolve.alias,
    ...aliases,
  };

  config.resolve.plugins = config.resolve.plugins.filter(plugin => {
    return !(plugin instanceof ModuleScopePlugin);
  });

  config.module.rules = [
    ...config.module.rules,
    babelLoaderRules,
  ];

  config.output = {
    ...config.output,
    publicPath: '',
  };

  return config;
};
