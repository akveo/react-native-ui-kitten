const path = require('path');

const frameworkModulePath = path.resolve('./src/framework');

// FIXME: Resolve `transform[stderr]: Could not resolve` command-line warnings.
// FIXME: Reproducible when starting with clearing cache (npm start -- -c)

const moduleResolverConfig = {
  root: path.resolve('./'),
  alias: {
    '@kitten/theme': path.resolve(frameworkModulePath, 'theme'),
    '@kitten/ui': path.resolve(frameworkModulePath, 'ui'),
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
