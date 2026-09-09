// `EvaConfigService.MAPPING_PACKAGE_NAMES` accepts only `@ui-kitten/eva` and `@ui-kitten/material`.
// Anything else makes `validateConfigOrWarn` return false and build-time styles stop generating.
const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
  evaPackage: '@ui-kitten/eva',
  customMappingPath: './custom-mapping.json',
};

module.exports = MetroConfig.create(evaConfig, {
  resolver: {
    sourceExts: ['js', 'json', 'ts', 'tsx'],
  },
});
