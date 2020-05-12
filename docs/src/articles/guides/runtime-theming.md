# Runtime Theming

UI Kitten supports of 2 built-in Eva Design System color schemes - Light and Dark. It is both possible to change the theme statically and dynamically during the runtime.

<div class="note note-warning">
  <div class="note-title">NOTE</div>
  <div class="note-body">
  This guide uses some code snippets implemented in previous tutorials.
  </div>
</div>

<hr>

## Create Theme Context

Create `theme-context.js` file and paste the code below.

```js
import React from 'react';

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});
```

<a href="https://reactjs.org/docs/context.html" target="_blank">In terms of React</a>, Context provides a way to pass data through the component tree without having to pass props down manually at every level.
 
With the code above, we create a `ThemeContext` to provide information about the current theme through the component tree, so any component can use it. The current value of theme context is:
- `theme` - Determines the name of the current theme. In this example, we're going to use Light theme by default, so we pass `light` to the context.
- `toggleTheme` - A function that will toggle the current theme.

<hr>

## Register Theme

Open `App.js` and paste the code below.

```js
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation.component';
import { ThemeContext } from './theme-context';

export default () => {

  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <AppNavigator/>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};
```

With the code above we modify our Application root to render `ThemeContext.Provider`. But let's take additional attention to some details:

- <a href="https://reactjs.org/docs/context.html#contextprovider" target="_blank">In terms of React</a>, every Context object comes with a Provider component that allows consuming components to subscribe to context changes. In this example, we pass `{ theme, toggleTheme }` and this object becomes our theme context.

- We import both `light` and `dark` themes from Eva Design System and create `themes` object to save them globally.

- We also create an application state with <a href="https://reactjs.org/docs/hooks-state.html" target="_blank">useState</a> function to save the name of current theme.

- Finally, we implement `toggleTheme` function to change the current theme.

<hr>

## Usage

Let's modify `home.component.js` to switch the theme by pressing a button.

```js
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';
import { ThemeContext } from './theme-context';

export const HomeScreen = ({ navigation }) => {

  const themeContext = React.useContext(ThemeContext);

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button style={{ marginVertical: 4 }} onPress={navigateDetails}>OPEN DETAILS</Button>
        <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>TOGGLE THEME</Button>
      </Layout>
    </SafeAreaView>
  );
};


```

With the code above, we import `ThemeContext` and use `useContext` function from React.
This function returns us the current value of theme context (remember we passed `{ theme, toggleTheme }`).

Finally, to toggle the current theme, we call `toggleTheme` function on button press to switch the current theme.

That’s it! Now your app can support both Light and Dark themes.

<hr>

## Note on state management

This guide is just a short introduction on how it can be done with standard React tools. Working with real production apps you're also able to implement this with other powerful state management tools like <a href="https://mobx.js.org/getting-started.html" target="_blank">MobX</a> or <a href="https://redux.js.org/introduction/getting-started" target="_blank">Redux</a>.

<hr>

## Conclusion

In this guide, we used several React tools like <a href="https://reactjs.org/docs/hooks-intro.html" target="_blank">Hooks</a> and <a href="https://reactjs.org/docs/context.html" target="_blank">Context</a>. Consider reading the React documentation to become more familiar with it. Also, take a look on the <a href="https://github.com/react-native-community/react-native-hooks" target="_blank">react-native-hooks</a> library, which also contains a lot of useful hooks you can use in your app.
