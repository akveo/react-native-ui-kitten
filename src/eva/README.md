# @ui-kitten/eva

Eva Design System mapping and the light and dark themes for [UI Kitten](https://akveo.github.io/react-native-ui-kitten). Required by `@ui-kitten/components`.

```sh
npm install @ui-kitten/components @ui-kitten/eva react-native-svg
```

```tsx
import * as eva from '@ui-kitten/eva';
import { ApplicationProvider } from '@ui-kitten/components';

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    {/* app */}
  </ApplicationProvider>
);
```

Exports `mapping`, `light` and `dark`. Spread your own theme over `eva.light` or `eva.dark` to rebrand; see [Branding](https://akveo.github.io/react-native-ui-kitten/docs/guides/branding) and [Customize mapping](https://akveo.github.io/react-native-ui-kitten/docs/design-system/customize-mapping).

## Part of UI Kitten

Lives in the [UI Kitten](https://github.com/akveo/react-native-ui-kitten) monorepo and is versioned together with [`@ui-kitten/components`](https://www.npmjs.com/package/@ui-kitten/components). Upgrading from 5.x? Run `npx @ui-kitten/codemod` and read the [5.x to 6 migration guide](https://akveo.github.io/react-native-ui-kitten/docs/migration/5x-to-6).

[MIT](https://github.com/akveo/react-native-ui-kitten/blob/master/LICENSE.txt)
