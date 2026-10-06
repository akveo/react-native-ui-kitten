# @ui-kitten/processor

Mapping processor for [UI Kitten](https://akveo.github.io/react-native-ui-kitten). Turns an Eva-style mapping (component appearances, variants and states) into the flat style objects components render with. Replaces `@eva-design/dss` and `@eva-design/processor` from v5.

Used internally by `@ui-kitten/components` and `@ui-kitten/metro-config`; install it directly only when you process mappings yourself.

```sh
npm install @ui-kitten/processor
```

```js
const { SchemaProcessor } = require('@ui-kitten/processor');
const { mapping } = require('@ui-kitten/eva');

const styles = new SchemaProcessor().process(mapping);
```

Also exports `MetaProcessor`, `createStyle`, `clearProcessorCache` and `getProcessorCacheStats`.

## Part of UI Kitten

Lives in the [UI Kitten](https://github.com/akveo/react-native-ui-kitten) monorepo and is versioned together with [`@ui-kitten/components`](https://www.npmjs.com/package/@ui-kitten/components). Upgrading from 5.x? Run `npx @ui-kitten/codemod` and read the [5.x to 6 migration guide](https://akveo.github.io/react-native-ui-kitten/docs/migration/5x-to-6).

[MIT](https://github.com/akveo/react-native-ui-kitten/blob/master/LICENSE.txt)
