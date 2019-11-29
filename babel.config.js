const path = require('path');

/**
 * UI Kitten modules aliases (needed for Jest resolver)
 */
const moduleAliases = {
  'react-native-ui-kitten': path.resolve(__dirname, './src/framework'),
  '@ui-kitten/eva-icons': path.resolve(__dirname, './src/eva-icons'),
  '@ui-kitten/moment': path.resolve(__dirname, './src/moment'),
  '@ui-kitten/date-fns': path.resolve(__dirname, './src/date-fns'),
};

const moduleInternalAliases = {
  '@kitten/theme': path.resolve(__dirname, './src/framework'),
  '@kitten/ui': path.resolve(__dirname, './src/framework'),
};

const moduleResolverConfig = {
  root: path.resolve('./'),
  alias: {
    ...moduleAliases,
    ...moduleInternalAliases,
  },
};

const presets = [
  'module:metro-react-native-babel-preset',
];

const plugins = [
  ['module-resolver', moduleResolverConfig],
];

module.exports = function(api) {
  api.cache(true);
  return { presets, plugins };
};

