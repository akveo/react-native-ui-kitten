# Getting Started

This guide will help you to initialize application with UI Kitten from a scratch. If you have an existing code base, refer to the [Manual Installation](guides/getting-started#manual-installation).

<hr>

## New Apps

This guide will help you to init application using UI Kitten template project. First, make sure you have latest React Native CLI installed: 

 ```bash
npm un -g react-native-cli && npm i -g @react-native-community/cli npx
```

### Create a New Project

```bash
npx react-native init MyApp --template react-native-template-ui-kitten
```

Or, if you want to init with TypeScript:

```bash
npx react-native init MyApp --template react-native-template-ui-kitten-typescript
```

That's it. For the next steps, simply follow command line instructions and move to the [next guide](guides/configure-navigation).

<hr>

## Manual Installation

If you have an existing code base and want to use UI Kitten in your project, follow the steps below to configure your application.

### Install UI Kitten

```bash
npm i react-native-ui-kitten @eva-design/eva
```

### Configure Application Root

Wrap the root component of your App into `ApplicationProvider` component. In your **App.js**:

```js
import React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from 'react-native-ui-kitten';

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text catetory='h1'>HOME</Text>
  </Layout>
); 

const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <HomeScreen />
  </ApplicationProvider>
);

export default App;
```

That's it. UI Kitten is ready now.
