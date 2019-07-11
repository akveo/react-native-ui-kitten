const path = require('path');

const kittenPath = path.resolve('./src/framework');

// FIXME: Resolve `transform[stderr]: Could not resolve` command-line warnings.
// FIXME: Reproducible when starting with clearing cache (npm start -- -c)

const moduleResolverConfig = {
  root: path.resolve('./'),
  alias: {
    '@kitten/theme': path.resolve(kittenPath, 'theme'),
    '@kitten/ui': path.resolve(kittenPath, 'ui'),
    '@ui-kitten/moment': path.resolve('./src/moment'),
    '@ui-kitten/date-fns': path.resolve('./src/date-fns'),
    'react-native-ui-kitten': kittenPath,
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
