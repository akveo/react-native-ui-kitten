# Getting Started

This guide will help you to initialize the application with UI Kitten from a scratch. If you have an existing code base, refer to the [Manual Installation](guides/getting-started#manual-installation).

<hr>

## New Apps

This guide will help you to init an application using UI Kitten template project.
First, make sure you have the right React Native CLI installed: 

 ```bash
npm un -g react-native-cli && npm i -g @react-native-community/cli
```

### Create a New Project

```bash
npx react-native init MyApp --template @ui-kitten/template-js

// Wish Typescript?
// npx react-native init MyApp --template @ui-kitten/template-ts
```

### Start your App

By following command-line instructions after successful init, go to the project folder and start your app:

```bash
npm run ios

// Using Yarn?
// yarn ios
``` 

That's it! By moving to the [next guide](guides/configure-navigation) you will learn how to configure navigation in React Native App.

You can also learn more about starting React Native Apps by reading <a href="https://github.com/react-native-community/cli/blob/master/docs/commands.md#commands" target="_blank">React Native CLI documentation</a>.

<hr>

## Manual Installation

If you have an existing code base and want to use UI Kitten in your project, follow the steps below to configure your application.

### Install UI Kitten

```bash
npm i @ui-kitten/components @eva-design/eva react-native-svg

// Using Yarn?
// yarn add @ui-kitten/components @eva-design/eva react-native-svg
```

<div class="note note-warning">
  <div class="note-body">If you use Expo, you should use `expo install react-native-svg@9.13.6` to install svg package.</div>
</div>

Within non-expo environment, we also need to complete installation for iOS by linking react-native-svg.

```bash
cd ios && pod install
```

Now you should have all in place. We need to restart the bundler to apply the changes.
Go back to the root application directory, shut down the current bundler process and call `npm start -- --reset-cache`.

### Configure Application Root

Wrap the root component of your App into `ApplicationProvider` component. In your **App.js**:

```jsx
import React from 'react';
import * as eva from '@eva-design/eva';
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

That's it. UI Kitten is ready now. Next, you might be interested in [branding](guides/branding) the application with Eva Design System.
