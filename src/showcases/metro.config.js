const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const workspaceRoot = path.resolve(__dirname, '../..');
const srcRoot = path.resolve(__dirname, '..');

const frameworkModules = [
  path.resolve(srcRoot, 'components'),
  path.resolve(srcRoot, 'date-fns'),
  path.resolve(srcRoot, 'eva-icons'),
  path.resolve(srcRoot, 'mapping-base'),
  path.resolve(srcRoot, 'moment'),
  path.resolve(srcRoot, 'eva'),
  path.resolve(srcRoot, 'material'),
  path.resolve(srcRoot, 'processor'),
];

const moduleDependencies = [
  // root node_modules
  path.resolve(workspaceRoot, 'node_modules'),

  // @ui-kitten/components dependencies
  path.resolve(workspaceRoot, 'node_modules/hoist-non-react-statics'),
  path.resolve(workspaceRoot, 'node_modules/fecha'),

  // @ui-kitten/eva-icons
  path.resolve(workspaceRoot, 'node_modules/react-native-eva-icons'),

  // external
  path.resolve(workspaceRoot, 'node_modules/react-is'),
  path.resolve(workspaceRoot, 'node_modules/source-map'),
];

// Force single copies of these modules - use root node_modules
const extraNodeModules = {
  // Core React modules - force root copy
  'react': path.resolve(workspaceRoot, 'node_modules/react'),
  'react-native': path.resolve(workspaceRoot, 'node_modules/react-native'),
  'react-native-svg': path.resolve(workspaceRoot, 'node_modules/react-native-svg'),
  '@babel/runtime': path.resolve(workspaceRoot, 'node_modules/@babel/runtime'),

  // Map @ui-kitten packages to local source
  '@ui-kitten/components': path.resolve(srcRoot, 'components'),
  '@ui-kitten/eva-icons': path.resolve(srcRoot, 'eva-icons'),
  '@ui-kitten/date-fns': path.resolve(srcRoot, 'date-fns'),
  '@ui-kitten/moment': path.resolve(srcRoot, 'moment'),
  '@ui-kitten/eva': path.resolve(srcRoot, 'eva'),
  '@ui-kitten/material': path.resolve(srcRoot, 'material'),
  '@ui-kitten/processor': path.resolve(srcRoot, 'processor'),
  '@ui-kitten/mapping-base': path.resolve(srcRoot, 'mapping-base'),
};

config.projectRoot = path.resolve(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  ...extraNodeModules,
};

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

config.watchFolders = [
  ...frameworkModules,
  ...moduleDependencies,
];

module.exports = config;
