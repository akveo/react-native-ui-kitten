# Improving Performance

By default, UI Kitten is configured with processing Eva mapping packages during the runtime. This may lead to performance issues when using [mapping customization](design-system/customize-mapping) or React Native Navigation by Wix. By following this guide, you will know how to get rid of this issues and save the time your application takes on loading.

<hr>

## Requirements

The following steps are only possible with installing UI Kitten package, which manages these issues:
```bash
npm i -D @ui-kitten/metro-config

// Using Yarn?
yarn add -D @ui-kitten/metro-config
```

The props passed to ApplicationProvider should also be modified:
```jsx
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    // ...
  </ApplicationProvider>
);
```

By spreading `eva` we say UI Kitten to use compiled Eva mapping if there is such.
If there is no, it still be compiled during the runtime.
Notice we omit `customMapping` property as well, since it's not required anymore.

<hr>

## Metro Bundler

Metro Bundler is used to bundle React Native applications.
By using it with extra configuration, we may compile Eva packages during the application build time.
This means, the application will start with ready-to-go stylings.

Create **metro.config.js** at the root of your project (if you don't have this file yet) and use the `MetroConfig.create` method to add necessary handlers into default config object (or previously specified if you already had customizations). 
If your application uses [mapping customization](design-system/customize-mapping) feature, or you have created another mapping.json during the previous steps, you can specify a path to custom mapping.json file.

For bare React Native project:
```js
const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
  evaPackage: '@eva-design/eva',
  // Optional, but may be useful when using mapping customization feature.
  // customMappingPath: './custom-mapping.json',
};

module.exports = (() => {
  // previousConfig - can be empty object or the react native default one (created by 'react native init') 
  // or previously merged config object if you already have other customizations
  const previousConfig = {};
  // Other possible customizations...
  const uiKittenMixedConfig = MetroConfig.create(evaConfig, previousConfig);
  // Other possible customizations...
  return uiKittenMixedConfig;
})();
```

For Expo project:
```js
const { getDefaultConfig } = require("expo/metro-config");

const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
  evaPackage: '@eva-design/eva',
  // Optional, but may be useful when using mapping customization feature.
  // customMappingPath: './custom-mapping.json',
};

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  // Other possible customizations...
  const uiKittenMixedConfig = MetroConfig.create(evaConfig, defaultConfig);
  // Other possible customizations...
  return uiKittenMixedConfig;
})();
```

Shut down the current bundler process and restart the app with clearing cache.

```bash
npm start -- --reset-cache

// Using Expo?
expo start -c
```

<hr>

## Command Line Interface

Despite that configuring Metro Bundler may cover most of the use cases,
we also provide a command line interface to do the same job, but manually.
Running within the CI environment is one of the cases when it should be done before the application is built.

Assuming `@ui-kitten/metro-config` package [is installed](guides/improving-performance#requirements),
we may run the following commanad:
```bash
ui-kitten bootstrap @eva-design/eva
```

Or, if there is a custom mapping:
```bash
ui-kitten bootstrap @eva-design/eva ./path-to/mapping.json
```

<hr>

## Definition

Let's take a look on the **evaConfig** we define:

**evaPackage** represents the name of Eva Design System package installed.

In this example, we use `@eva-design/eva`.
It may be one of the valid Eva Design System packages.

**customMappingPath** represents a path to custom mapping if you use [mapping customization](design-system/customize-mapping) feature. You may omit it if you do not customize Eva.

The second argument of `create` function is a standard configuration of Metro Bundler. In case you had `metro.config.js` previously, pass the object you had to merge it with UI Kitten configuration.
