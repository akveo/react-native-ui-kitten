# Change Current Theme

UI Kitten Theme System has support of 2 built-in Eva Design System color schemes - `light` and `dark`. It is both possible to change the theme statically and dynamically during the runtime.

<hr>

## Runtime Theme Switch

It is extremely simple to replace a theme from one to another.
All you need to do is to find a way of how you notify `ApplicationProvider` component about theme change.
Let's take a look on example when you want to switch theme from `HomeScreen` component.

```js
import * as React from 'react';
import { Layout, Button } from 'react-native-ui-kitten';

export const HomeScreen = (props) => (
  <Layout style={styles.container}>
    <Button onPress={props.toggleTheme}>Switch theme</Button>
  </Layout>
);
```

We're going to switch theme by pressing a Button. In this case - the simplest way we can do is passing a `toggleTheme` prop into `HomeScreen` component. Let's go back to `App` component and implement this.

```js
import * as React from 'react';
import { mapping, light } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { HomeScreen } from './path-to/home.component';

const App = () => {
  
  const toggleTheme = () => {
    // 🌞 -> 🌚
  };
  
  return (
    <ApplicationProvider mapping={mapping} theme={light}>
      <HomeScreen toggleTheme={toggleTheme}/>
    </ApplicationProvider>
  );
};

export default App;
```

Now we should only modify `toggleTheme` function. To do that, let's take a look on the snippet below:

```js
import * as React from 'react';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { mapping, light, dark } from '@eva-design/eva'; // <-- Import both Light and Dark themes
import { HomeScreen } from './path-to/home.component';

const themes = { light, dark };

const App = () => {

  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <ApplicationProvider mapping={mapping} theme={themes[theme]}>
      <HomeScreen toggleTheme={toggleTheme}/>
    </ApplicationProvider>
  );
};

export default App;
```

Import both light and dark themes and set them into a `themes` object. Then — we pass the name of the initial theme into the `useState` hook. This will allow us saving the current theme in the application state. And when `toggleTheme` is called — we call the `setTheme` function returned from that hook to apply a dark or light theme depending on the current theme. Notice that in this example we don’t store any theme object, but just it’s key.

And that’s it! Now your app can support both Light and Dark modes.

<hr>

## About state management

We don't force you to implement theme switching using props. This is just a short guide of how it can be done. Working with a real production apps you're also able to implement this with other powerful state management tools like [MobX](https://mobx.js.org/getting-started.html) or [Redux](https://redux.js.org/).

<hr>

## Related Articles

- [Customize Theme](design-system/customize-theme)
- [Create Custom Theme](design-system/create-custom-theme)
