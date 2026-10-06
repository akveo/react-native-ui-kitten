# @ui-kitten/metro-config

Metro plugin that compiles the Eva mapping at build time, so [UI Kitten](https://akveo.github.io/react-native-ui-kitten) components mount with precomputed styles instead of compiling them on first render. Most useful with a large custom mapping or when `ApplicationProvider` is mounted more than once.

```sh
npm install -D @ui-kitten/metro-config
```

```js
// metro.config.js
const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
  evaPackage: '@ui-kitten/eva',
  // customMappingPath: './custom-mapping.json',
};

module.exports = (() => {
  const previousConfig = {}; // or your existing Metro config
  return MetroConfig.create(evaConfig, previousConfig);
})();
```

Then spread the package into the provider (`<ApplicationProvider {...eva}>`) or pass `styles={eva.styles}`; passing `mapping` explicitly opts back into runtime compilation. A `ui-kitten` CLI (`npx ui-kitten bootstrap @ui-kitten/eva`) runs the same step outside Metro.

Full guide: [Improving performance](https://akveo.github.io/react-native-ui-kitten/docs/guides/improving-performance).

## Part of UI Kitten

Lives in the [UI Kitten](https://github.com/akveo/react-native-ui-kitten) monorepo and is versioned together with [`@ui-kitten/components`](https://www.npmjs.com/package/@ui-kitten/components). Upgrading from 5.x? Run `npx @ui-kitten/codemod` and read the [5.x to 6 migration guide](https://akveo.github.io/react-native-ui-kitten/docs/migration/5x-to-6).

[MIT](https://github.com/akveo/react-native-ui-kitten/blob/master/LICENSE.txt)
