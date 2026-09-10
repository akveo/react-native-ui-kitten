---
id: improving-performance
title: Improving Performance
sidebar_label: Improving Performance
description: How to get rid of performance issues in UI Kitten when using mapping customization or React Native Navigation by Wix.
keywords:
  - React Native
  - UI Kitten
  - performance
  - custom mapping
  - metro config
---

# Improving Performance

By default, UI Kitten is configured with processing Eva mapping packages during the runtime. This may lead to performance issues when using [mapping customization](/docs/design-system/customize-mapping) or React Native Navigation by Wix. By following this guide, you will know how to get rid of these issues and save the time your application takes on loading.

---

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
import * as eva from '@ui-kitten/eva';
import { ApplicationProvider } from '@ui-kitten/components';

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    // ...
  </ApplicationProvider>
);
```

By spreading `eva` we say UI Kitten to use compiled Eva mapping if there is such. If there is no, it still be compiled during the runtime. Notice we omit `customMapping` property as well, since it's not required anymore.

---

## Metro Bundler

Metro Bundler is used to bundle React Native applications. By using it with extra configuration, we may compile Eva packages during the application build time. This means, the application will start with ready-to-go stylings.

Create **metro.config.js** at the root of your project (if you don't have this file yet) and use the `MetroConfig.create` method to add necessary handlers into default config object.

For bare React Native project:

```js
const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
  evaPackage: '@ui-kitten/eva',
  // Optional, but may be useful when using mapping customization feature.
  // customMappingPath: './custom-mapping.json',
};

module.exports = (() => {
  const previousConfig = {};
  const uiKittenMixedConfig = MetroConfig.create(evaConfig, previousConfig);
  return uiKittenMixedConfig;
})();
```

For Expo project:

```js
const { getDefaultConfig } = require("expo/metro-config");

const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
  evaPackage: '@ui-kitten/eva',
  // Optional, but may be useful when using mapping customization feature.
  // customMappingPath: './custom-mapping.json',
};

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  const uiKittenMixedConfig = MetroConfig.create(evaConfig, defaultConfig);
  return uiKittenMixedConfig;
})();
```

### What happens when Metro loads the config

`MetroConfig.create` compiles the styles at the moment `metro.config.js` is loaded, before Metro starts
bundling. It does not wait for any bundler event, so it works the same under `expo start`,
`expo export`, EAS builds and the bare `react-native start` / `bundle` commands:

1. The Eva mapping (merged with `customMappingPath`, if set) is compiled and written to
   `node_modules/.cache/ui-kitten/eva-generated.json` (or `material-generated.json`).
2. `node_modules/@ui-kitten/eva/index.js` gains a single line, `exports.styles = require(...)`,
   which is what `<ApplicationProvider {...eva}>` picks up. The line is added once; running the
   compilation again is a no-op unless the custom mapping changed.
3. When a `customMappingPath` is set and the file exists, Metro's dev server also watches that file
   and recompiles when it changes. Nothing is watched otherwise. Set `watch: false` in `evaConfig`
   to disable it.

Because step 2 changes a file that Metro has already cached, restart the bundler once with the cache
cleared so it picks the updated `@ui-kitten/eva` up:

```bash
npm start -- --reset-cache

// Using Expo?
npx expo start -c
```

A misconfiguration (unknown `evaPackage`, a package that is not installed, a `customMappingPath`
that does not exist or is not valid JSON) is reported as a `warn` message and the styles are left
uncompiled; the app then falls back to compiling Eva at runtime. The Metro config is still returned,
so the bundler keeps working.

### Projects that cannot change their Metro config

The command line interface below does exactly the same work. Run it as a `postinstall` script so
the styles are compiled every time dependencies are installed:

```json
{
  "scripts": {
    "postinstall": "npx ui-kitten bootstrap @ui-kitten/eva"
  }
}
```

Or, with a custom mapping:

```json
{
  "scripts": {
    "postinstall": "npx ui-kitten bootstrap @ui-kitten/eva ./custom-mapping.json"
  }
}
```

---

## Command Line Interface

Despite that configuring Metro Bundler may cover most of the use cases, we also provide a command line interface to do the same job, but manually. Running within the CI environment is one of the cases when it should be done before the application is built.

Assuming `@ui-kitten/metro-config` package [is installed](#requirements), we may run the following command:

```bash
ui-kitten bootstrap @ui-kitten/eva
```

Or, if there is a custom mapping:

```bash
ui-kitten bootstrap @ui-kitten/eva ./path-to/mapping.json
```

The command prints `success Successfully bootstrapped @ui-kitten/eva` and exits with code 0. On a
configuration mistake it prints a `warn` message explaining what was tried and exits with code 1, so
a CI script can fail early. It is safe to run repeatedly: `exports.styles` is only appended once.

---

## Definition

Let's take a look on the **evaConfig** we define:

**evaPackage** represents the name of Eva Design System package installed. In this example, we use `@ui-kitten/eva`. It may be one of the valid Eva Design System packages.

**customMappingPath** represents a path to custom mapping if you use [mapping customization](/docs/design-system/customize-mapping) feature. You may omit it if you do not customize Eva.

The second argument of `create` function is a standard configuration of Metro Bundler. In case you had `metro.config.js` previously, pass the object you had to merge it with UI Kitten configuration.
