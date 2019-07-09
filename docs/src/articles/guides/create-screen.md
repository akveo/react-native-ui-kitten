# Create UI Kitten Screen

<div class="note note-info">
  <div class="note-title">IMPORTANT</div>
  <div class="note-body">
  This tutorial assumes you have everything in place and [ApplicationProvider is configured](guides/install-ui-kitten).
  </div>
</div>

Let's create a simple UI Kitten screen (layout with a content) in your project. 
We suppose that you have a separate component per screen, let's open your `some-screen.component.js` and import necessary UI components

<hr>

## Create a Component

```js
import * as React from 'react';
import { Layout, Text, Button } from 'react-native-ui-kitten';

export const HomeScreen = () => (
  <Layout>
    <Text category='h4'>Welcome to UI Kitten</Text>
    <Button>BUTTON</Button>
  </Layout>
);
```

The example above will render a simple screen with a welcome text and a button.

<hr>

## Modify styles

Now let's add some styles to fit the full available space on the device screen.

```js
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Text } from 'react-native-ui-kitten';

export const HomeScreen = () => (
  <Layout style={styles.container}>
    <Text style={styles.text} category='h4'>Welcome to UI Kitten</Text>
    <Button>BUTTON</Button>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    marginVertical: 16,
  },
});

```

<hr>

## Review the changes

Let's now set this screen as `ApplicationProvider` children to quickly review changes

```js
import * as React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { HomeScreen } from './path-to/some-screen.component' // <-- Import a screen we've created

const App = () => (
  <ApplicationProvider
    mapping={mapping}
    theme={lightTheme}>
    <HomeScreen/>
  </ApplicationProvider>
);

export default App;
```

As a result, you should have a page with a screen looking similar to this:

![image](assets/images/articles/guides/sample-screen.png)
