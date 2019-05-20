const path = require('path');

const playgroundPath = path.resolve(__dirname, '../src/playground');

module.exports = {
  ENV: 'prod',
  KITTEN_PATH: path.resolve(__dirname, '../src/framework'),
  MAPPING_PATH: path.resolve(playgroundPath, 'node_modules/@eva/eva'),
  THEME_PATH: path.resolve(playgroundPath, 'node_modules/@eva/theme-eva'),
};
