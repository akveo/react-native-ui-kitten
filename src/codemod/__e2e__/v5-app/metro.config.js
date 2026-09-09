/**
 * The v5 metro config. `evaPackage: '@eva-design/eva'` is the one setting that genuinely stops
 * working under v6: `EvaConfigService.MAPPING_PACKAGE_NAMES` accepts only `@ui-kitten/eva` and
 * `@ui-kitten/material`, so `validateConfigOrWarn` returns false and build-time styles stop being
 * generated — silently, because runtime processing takes over.
 */
const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
  evaPackage: '@eva-design/eva',
};

module.exports = MetroConfig.create(evaConfig, {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
});
