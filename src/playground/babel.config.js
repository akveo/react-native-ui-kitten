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
    '@kitten/theme': path.resolve(Config.KITTEN_PATH, 'theme'),
    '@kitten/ui': path.resolve(Config.KITTEN_PATH, 'ui'),
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

  const devPlugins = [
    '@babel/transform-react-jsx-source',
  ];

  const env = {
    development: {
      plugins: devPlugins,
    },
  };

  return { presets, plugins, env };
};
