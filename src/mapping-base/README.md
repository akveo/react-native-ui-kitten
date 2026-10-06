# @ui-kitten/mapping-base

Shared mapping schema and merge helpers for [UI Kitten](https://akveo.github.io/react-native-ui-kitten) design systems. `@ui-kitten/eva` and `@ui-kitten/material` are built on it; use it to author a design system of your own.

```sh
npm install @ui-kitten/mapping-base
```

```js
const { createMapping, mergeMapping } = require('@ui-kitten/mapping-base');
const baseMapping = require('@ui-kitten/mapping-base/mapping.json');

const customMapping = createMapping({
  base: baseMapping,
  strict: { 'text-font-family': 'Roboto' },
  components: { /* component overrides */ },
});
```

See [Customize mapping](https://akveo.github.io/react-native-ui-kitten/docs/design-system/customize-mapping).

## Part of UI Kitten

Lives in the [UI Kitten](https://github.com/akveo/react-native-ui-kitten) monorepo and is versioned together with [`@ui-kitten/components`](https://www.npmjs.com/package/@ui-kitten/components). Upgrading from 5.x? Run `npx @ui-kitten/codemod` and read the [5.x to 6 migration guide](https://akveo.github.io/react-native-ui-kitten/docs/migration/5x-to-6).

[MIT](https://github.com/akveo/react-native-ui-kitten/blob/master/LICENSE.txt)
