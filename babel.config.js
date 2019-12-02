const path = require('path');

/**
 * UI Kitten modules aliases (needed for Jest resolver)
 */
const moduleAliases = {
  '@ui-kitten/components': path.resolve(__dirname, './src/components'),
  '@ui-kitten/eva-icons': path.resolve(__dirname, './src/eva-icons'),
  '@ui-kitten/moment': path.resolve(__dirname, './src/moment'),
  '@ui-kitten/date-fns': path.resolve(__dirname, './src/date-fns'),
};

const moduleInternalAliases = {
  '@kitten/theme': path.resolve(__dirname, './src/components/theme'),
  '@kitten/ui': path.resolve(__dirname, './src/components/ui'),
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

