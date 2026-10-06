# @ui-kitten/eva-icons

480+ [Eva Icons](https://akveo.github.io/eva-icons) as an `IconRegistry` pack for [UI Kitten](https://akveo.github.io/react-native-ui-kitten).

```sh
npm install @ui-kitten/eva-icons react-native-svg
```

```tsx
import * as eva from '@ui-kitten/eva';
import { ApplicationProvider, IconRegistry, Icon } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <Icon name='star' fill='#8F9BB3' style={{ width: 32, height: 32 }} />
    </ApplicationProvider>
  </>
);
```

Bundle only the icons you use with `createEvaIconsPack`, or render an icon outside of `Icon` with `EvaIcon` / `createEvaIcon`:

```tsx
import { createEvaIconsPack } from '@ui-kitten/eva-icons';
import home from '@ui-kitten/eva-icons/icons/home';
import star from '@ui-kitten/eva-icons/icons/star';

export const AppIconsPack = createEvaIconsPack([home, star]);
```

Full guide: [Icon packages](https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages).

## Part of UI Kitten

Lives in the [UI Kitten](https://github.com/akveo/react-native-ui-kitten) monorepo and is versioned together with [`@ui-kitten/components`](https://www.npmjs.com/package/@ui-kitten/components). Upgrading from 5.x? Run `npx @ui-kitten/codemod` and read the [5.x to 6 migration guide](https://akveo.github.io/react-native-ui-kitten/docs/migration/5x-to-6).

[MIT](https://github.com/akveo/react-native-ui-kitten/blob/master/LICENSE.txt)
