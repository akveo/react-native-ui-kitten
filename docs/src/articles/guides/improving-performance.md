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

If your application uses [mapping customization](design-system/customize-mapping) feature,
or you have created another mapping.json during the previous steps,
it's also required to specify a path to custom mapping.json.

```js
const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
  evaPackage: '@eva-design/eva',
  customMappingPath: './path-to/mapping.json',
};

module.exports = MetroConfig.create(evaConfig, {
  // Whatever was previously specified
});
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

## Using with 3rd party Metro configurations

Some libraries may require having specific Metro Bundler configuration, assuming you should merge it with the one provided by UI Kitten. To simplify this process, we made `@ui-kitten/metro-config` package resolve this issue out of the box, meaning you **should not** merge two configurations yourself.

For example, let's have a look on how it can be used with `react-native-svg-transformer` library:

The required configuration is:

```js
{
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"]
  }
}
```

Meaning you can simply put it down into `create` function.

```js
const MetroConfig = require('@ui-kitten/metro-config');
const defaultConfig = require('metro-config/src/defaults').getDefaultValues();

const evaConfig = {
  evaPackage: '@eva-design/eva',
};

module.exports = MetroConfig.create(evaConfig, {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg']
  },
});
```

