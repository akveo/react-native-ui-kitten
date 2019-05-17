const path = require('path');

const kittenPath = path.resolve('../framework');

// FIXME: Resolve `transform[stderr]: Could not resolve` command-line warnings.
// FIXME: Reproducible when starting with clearing cache (npm start -- -c)

const productionConfig = {
  mappingPath: path.resolve('./node_modules/@eva/eva'),
  themePath: path.resolve('./node_modules/@eva/theme-eva'),
};

const developmentConfig = {
  mappingPath: path.resolve(__dirname, '../../../eva/packages/mapping/eva'),
  themePath: path.resolve(__dirname, '../../../eva/packages/theme/eva'),
};

const environment = {
  prod: productionConfig,
  dev: developmentConfig,
};

function moduleResolverConfig(env) {
  return {
    root: path.resolve('./'),
    alias: {
      '@kitten/theme': path.resolve(kittenPath, 'theme'),
      '@kitten/ui': path.resolve(kittenPath, 'ui'),
      '@eva/eva': path.resolve(env.mappingPath),
      '@eva/theme-eva': path.resolve(env.themePath),
    },
  }
}

module.exports = function (api) {
  api.cache(true);

  const presets = [
    'babel-preset-expo',
  ];

  const plugins = [
    ['module-resolver', moduleResolverConfig(environment.prod)],
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
