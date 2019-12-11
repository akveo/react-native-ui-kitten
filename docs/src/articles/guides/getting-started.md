# Getting Started

This guide will help you to initialize the application with UI Kitten from a scratch. If you have an existing code base, refer to the [Manual Installation](guides/getting-started#manual-installation).

<hr>

## New Apps

This guide will help you to init an application using UI Kitten template project. First, make sure you have the latest React Native CLI installed: 

 ```bash
npm un -g react-native-cli && npm i -g @react-native-community/cli npx
```

### Create a New Project

```bash
npx react-native init MyApp --template @ui-kitten/template-js
```

Or, if you want to init with TypeScript:

```bash
npx react-native init MyApp --template @ui-kitten/template-ts
```

### Start your App

By following command-line instructions after successful init, go to the project folder and start your app:

```bash
npm run start:ios
``` 

That's it! By moving to the [next guide](guides/configure-navigation) you will learn how to configure navigation in React Native App.

You can also learn more about starting React Native Apps by reading <a href="https://github.com/react-native-community/cli/blob/master/docs/commands.md#commands" target="_blank">React Native CLI documentation</a>.

<hr>

## Manual Installation

If you have an existing code base and want to use UI Kitten in your project, follow the steps below to configure your application.

### Install UI Kitten

```bash
npm i @ui-kitten/components @eva-design/eva react-native-svg
```

We also need to complete installation for iOS by linking react-native-svg.

```bash
cd ios && pod install
```

Now you should have all in place. We need to restart the bundler to apply the changes.
Go back to the root application directory, shut down the current bundler process and call `npm start -- --reset-cache`.

### Configure Application Root

Wrap the root component of your App into `ApplicationProvider` component. In your **App.js**:

```jsx
import React from 'react';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>HOME</Text>
  </Layout>
);

const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <HomeScreen />
  </ApplicationProvider>
);

export default App;
```

That's it. UI Kitten is ready now. Next, you might be interested in [branding](guides/branding) the application with Eva Design System.
