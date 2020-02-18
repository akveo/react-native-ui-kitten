# Improving Performance

By default, UI Kitten is configured with processing Eva mapping packages during the runtime. This may lead to performance issues when using [mapping customization](design-system/customize-mapping) or React Native Navigation by Wix. By following this guide, you will know how to get rid of this and save time your application takes on loading.

## Configuration

Install the additional metro configuration:

```bash
npm i -D @ui-kitten/metro-config
```

Create **metro.config.js** at the root of your project if you don't have this file yet and place the following code:

```js
const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
  evaPackage: '@eva-design/eva',
  // Optional, but may be useful when using mapping customization feature.
  // customMappingPath: './custom-mapping.json',
};

module.exports = MetroConfig.create(evaConfig, {
  // Whatever was previously specified
});
```

Modify props passed to ApplicationProvider:

```jsx
import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    // ...
  </ApplicationProvider>
);
```
Restart Metro Bundler if it is running to apply the changes.

<hr>

## Definition

Let's take a look on the **evaConfig** we define:

**evaPackage** represents the name of Eva Design System package installed.

In this example, we use `@eva-design/eva`.
It may be one of the valid Eva Design System packages.

**customMappingPath** represents a path to custom mapping if you use [mapping customization](design-system/customize-mapping) feature. You may omit it if you do not customize Eva.

The second argument of `create` function is a standard configuration of Metro Bundler. In case you had `metro.config.js` previously, pass the object you had to merge it with UI Kitten configuration.
