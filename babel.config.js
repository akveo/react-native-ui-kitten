const path = require('path');

/**
 * UI Kitten modules aliases.
 * Allows importing framework modules into playground
 */
const moduleAliases = {
  'react-native-ui-kitten': path.resolve(__dirname, './src/framework'),
  '@kitten/theme': path.resolve(__dirname, './src/framework'),
  '@kitten/ui': path.resolve(__dirname, './src/framework'),
  '@ui-kitten/eva-icons': path.resolve(__dirname, './src/eva-icons'),
};

const moduleResolverConfig = {
  root: path.resolve('./'),
  alias: {
    ...moduleAliases,
  },
};

module.exports = function(api) {
  api.cache(true);

  const presets = [
    'module:metro-react-native-babel-preset',
  ];

  const plugins = [
    ['module-resolver', moduleResolverConfig],
  ];

  return { presets, plugins };
};
