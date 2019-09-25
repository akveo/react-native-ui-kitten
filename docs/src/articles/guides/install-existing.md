# Add into existing project

If you already have an existing code base, you're able to give UI Kitten a try as simple as `npm install`. Please refer to [Start a new App Guide](guides/start-a-new-app) if you don't have any code yet.

<hr>

## Install UI Kitten and Eva Design System

```bash
npm i react-native-ui-kitten @eva-design/eva
```

<hr>

## Configure Application Root

At this step you have everything in place, let's configure UI Kitten to be used in your app.
In your **App.js**:

```js
import React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from 'react-native-ui-kitten';

const ApplicationContent = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Welcome to UI Kitten</Text>
  </Layout>
); 

const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <ApplicationContent />
  </ApplicationProvider>
);

export default App;
```

That's it. UI Kitten is ready now.
