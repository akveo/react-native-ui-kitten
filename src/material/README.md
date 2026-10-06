# @ui-kitten/material

Material-flavoured mapping and themes for [UI Kitten](https://akveo.github.io/react-native-ui-kitten). A drop-in alternative to `@ui-kitten/eva`.

```sh
npm install @ui-kitten/components @ui-kitten/material react-native-svg
```

```tsx
import * as material from '@ui-kitten/material';
import { ApplicationProvider } from '@ui-kitten/components';

export default () => (
  <ApplicationProvider {...material} theme={material.light}>
    {/* app */}
  </ApplicationProvider>
);
```

Exports `mapping`, `light` and `dark`. See [Design systems](https://akveo.github.io/react-native-ui-kitten/docs/design-system/eva-design-system).

## Part of UI Kitten

Lives in the [UI Kitten](https://github.com/akveo/react-native-ui-kitten) monorepo and is versioned together with [`@ui-kitten/components`](https://www.npmjs.com/package/@ui-kitten/components). Upgrading from 5.x? Run `npx @ui-kitten/codemod` and read the [5.x to 6 migration guide](https://akveo.github.io/react-native-ui-kitten/docs/migration/5x-to-6).

[MIT](https://github.com/akveo/react-native-ui-kitten/blob/master/LICENSE.txt)
