const path = require('path');
const env = require('./env');

const appAliases = {
  '@pg/assets': './src/assets',
  '@pg/components': './src/components',
  '@pg/icons': './src/icons',
  '@pg/model': './src/model',
  '@pg/navigation': './src/navigation',
  '@pg/scenes': './src/scenes',
  '@pg/themes': './src/themes',
};

/**
 * UI Kitten modules aliases.
 * Allows importing framework modules into playground
 */
const moduleAliases = {
  'react-native-ui-kitten': path.resolve(__dirname, '../framework'),
  '@ui-kitten/eva-icons': path.resolve(__dirname, '../eva-icons'),
  '@ui-kitten/moment': path.resolve(__dirname, '../moment'),
  '@ui-kitten/date-fns': path.resolve(__dirname, '../date-fns'),
};

const moduleInternalAliases = {
  '@kitten/theme': path.resolve(__dirname, '../framework/theme'),
  '@kitten/ui': path.resolve(__dirname, '../framework/ui'),
};

/**
 * Eva modules aliases.
 * Allows importing Eva modules into playground depending on environment
 */
const evaAliases = {
  '@eva-design/processor': path.resolve(env.PROCESSOR_PATH),
  '@eva-design/eva': path.resolve(env.MAPPING_PATH),
};

const moduleResolverConfig = {
  root: path.resolve('./'),
  alias: {
    ...appAliases,
    ...moduleAliases,
    ...moduleInternalAliases,
    ...evaAliases,
  },
};

module.exports = function (api) {
  api.cache(true);

  const presets = [
    'babel-preset-expo',
  ];

  const plugins = [
    ['module-resolver', moduleResolverConfig],
  ];

  return { presets, plugins };
};
