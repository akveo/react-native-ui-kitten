const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

const aliases = {
  'react-native-web': path.resolve(__dirname, './node_modules/react-native-web'),
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

  config.module.rules = [
    ...config.module.rules,
    babelLoaderRules,
  ];

  return config;
};
