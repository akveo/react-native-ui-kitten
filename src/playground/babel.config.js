const path = require('path');

const kittenPath = path.resolve('../framework');
const evaPath = path.resolve(__dirname, '../../../eva/packages');

// FIXME: Resolve `transform[stderr]: Could not resolve` command-line warnings.
// FIXME: Reproducible when starting with clearing cache (npm start -- -c)

const moduleResolverConfig = {
  root: path.resolve('./'),
  alias: {
    '@kitten/theme': path.resolve(kittenPath, 'theme'),
    '@kitten/ui': path.resolve(kittenPath, 'ui'),
    '@eva/eva': path.resolve(evaPath, 'mapping/eva'),
    '@eva/theme-eva': path.resolve(evaPath, 'theme/eva'),
  },
};

module.exports = function(api) {
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

  return { presets, env, plugins };
};
