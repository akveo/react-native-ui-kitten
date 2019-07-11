const path = require('path');
const Config = require('../../config');

// FIXME: Resolve `transform[stderr]: Could not resolve` command-line warnings.
// FIXME: Reproducible when starting with clearing cache (npm start -- -c)
//
// TODO: Framework path aliasing even not needed here. Replace?
// TODO: Replace nested package.json-s with aliases

const moduleResolverConfig = {
  root: path.resolve('./'),
  alias: {
    'react-native-ui-kitten': path.resolve(Config.MODULES_PATH, 'framework'),
    '@kitten/theme': path.resolve(Config.MODULES_PATH, 'framework/theme'),
    '@kitten/ui': path.resolve(Config.MODULES_PATH, 'framework/ui'),
    '@ui-kitten/moment': path.resolve(Config.MODULES_PATH, 'moment'),
    '@ui-kitten/date-fns': path.resolve(Config.MODULES_PATH, 'date-fns'),
    '@eva-design/eva': path.resolve(Config.MAPPING_PATH),
    '@eva-design/processor': path.resolve(Config.PROCESSOR_PATH),
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
