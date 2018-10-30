const path = require('path');

module.exports = {
  extraNodeModules: {
    // ...
    // add needed-to-transform dependencies here
    //
    'react': path.resolve(__dirname, './node_modules/react'),
    'react-native': path.resolve(__dirname, './node_modules/react-native'),
  },
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getProjectRoots() {
    return [
      path.resolve(__dirname),
      path.resolve(__dirname, '../framework'),
    ];
  },
  getSourceExts() {
    return [
      'ts',
      'tsx',
    ]
  }
};