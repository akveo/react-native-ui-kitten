---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
description: The guide which helps you to initialize the application with UI Kitten from scratch.
keywords:
  - React Native
  - UI Kitten
  - installation
  - manual installation
---

# Getting Started

This guide will help you to initialize the application with UI Kitten from scratch. If you have an existing code base, refer to the [Manual Installation](#manual-installation).

---

## New Apps

This guide will help you to init an application using UI Kitten template project.

:::warning
The starter templates have not been republished for UI Kitten 6. `@ui-kitten/template-js` and `@ui-kitten/template-ts` still install React Native 0.70 and UI Kitten 5.3.1. If you want v6, use [Manual Installation](#manual-installation) instead.
:::

### Create a New Project

The `react-native init` command was removed from the React Native CLI. Use the community CLI directly:

```bash
npx @react-native-community/cli init MyApp --template @ui-kitten/template-js

// Wish Typescript?
// npx @react-native-community/cli init MyApp --template @ui-kitten/template-ts
```

### Start your App

By following command-line instructions after successful init, go to the project folder and start your app:

```bash
npm run ios

// Using Yarn?
// yarn ios
```

That's it! By moving to the [next guide](/docs/guides/configure-navigation) you will learn how to configure navigation in React Native App.

You can also learn more about starting React Native Apps by reading [React Native CLI documentation](https://github.com/react-native-community/cli/blob/master/docs/commands.md#commands).

---

## Manual Installation

If you have an existing code base and want to use UI Kitten in your project, follow the steps below to configure your application.

### Install UI Kitten

```bash
npm i @ui-kitten/components@beta @ui-kitten/eva@beta react-native-svg

// Using Yarn?
// yarn add @ui-kitten/components@beta @ui-kitten/eva@beta react-native-svg
```

:::warning
UI Kitten 6 is published under the `beta` dist-tag. Do not omit `@beta` — `@ui-kitten/components@latest` is still `5.3.1`, while `@ui-kitten/eva` only exists as a v6 package, so an untagged install mixes the two major versions. If you are upgrading an existing app, read the [5.x to 6.0.0 Migration](/docs/migration/5x-to-6) guide.
:::

:::warning
If you use Expo, you should use `expo install react-native-svg` to install svg package.
:::

:::warning
If you use Expo for Web, you need to add the following underneath the `"web"` key in `app.json`: `"build": { "babel": { "include": [ "@ui-kitten/components" ] } }`
:::

Within non-expo environment, we also need to complete installation for iOS by linking react-native-svg.

```bash
cd ios && pod install
```

Now you should have all in place. We need to restart the bundler to apply the changes. Go back to the root application directory, shut down the current bundler process and call `npm start -- --reset-cache`.

### Configure Application Root

Wrap the root component of your App into `ApplicationProvider` component. In your **App.js**:

```jsx
import React from 'react';
import * as eva from '@ui-kitten/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>HOME</Text>
  </Layout>
);

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <HomeScreen />
  </ApplicationProvider>
);
```

That's it. UI Kitten is ready now. Next, you might be interested in [branding](/docs/guides/branding) the application with Eva Design System.
