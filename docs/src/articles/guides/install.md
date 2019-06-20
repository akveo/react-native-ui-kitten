# Install UI Kitten

If you don't have any code yet, please consider checking <a href="https://facebook.github.io/react-native/docs/getting-started" target="_blank">React Native Getting Started</a> documentation for help creating your app.

<hr>

### Installation

We recommend to develop React Native with expo-cli, you can install it with the following command.

```bash
npm i -g expo-cli
```

<hr>

### Create a New Project

A new project can be created using Expo CLI tools.

```bash
expo init PROJECT-NAME
```
<hr>

### Install UI Kitten and Eva Design System

```bash
npm i react-native-ui-kitten @eva-design/eva
```

<hr>

### Configure Application Root

At this step you have everything in place, let's configure UI Kitten to be used in your app.

```js
import * as React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';

const App = () => (
  <ApplicationProvider
    mapping={mapping}
    theme={lightTheme}>
    <Layout style={{flex: 1}}/>
  </ApplicationProvider>
);

export default App;
```

That's it. UI Kitten is ready now.
