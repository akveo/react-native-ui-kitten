# Customize Theme

UI Kitten components are styled with Eva Design System configuration files and themes.
In order to be able to customize theme variables, read a few steps described below.

<hr>

## Import a theme

Create a `themes.js` in your `src` folder and import a theme of your choice:

```js
// import Eva Design System theme
import { light as lightTheme } from '@eva-design/eva';
```
<hr>

## Modify theme variables

To adjust some of the theme variables, we need to merge our theme with Eva Design System theme.
Let's make text color lighter and disabled text - darker:

```js
import { light as lightTheme } from '@eva-design/eva';

export const theme = {
  ...lightTheme,
  
  "text-basic-color": "$color-basic-800", // <- we setting color-basic-800 instead of color-basic-1000
  "text-disabled-color": "$color-basic-600", // <- and color-basic-600 as instead of color-basic-500
};
```

We can also modify a primary color, for example make it violet:

```js
import { light as lightTheme } from '@eva-design/eva';

export const theme = {
  ...lightTheme,
  
  "color-primary-100": "#faf7ff", // <- new primary color
  "color-primary-200": "#ece3ff",
  "color-primary-300": "#d5bfff",
  "color-primary-400": "#b18aff",
  "color-primary-500": "#a16eff",
  "color-primary-600": "#7b51db",
  "color-primary-700": "#5a37b8",
  "color-primary-800": "#3e2494",
  "color-primary-900": "#29157a",

  "text-basic-color": "$color-basic-800",
  "text-disabled-color": "$color-basic-600",
};
```

<hr>

## Apply Custom Theme

The last thing, import your theme from `theme.js` and pass it into `ApplicationProvider` component:

```js
import * as React from 'react';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';
import { theme } from './path-to/theme'; // <-- Import custom theme

const App = () => (
  <ApplicationProvider mapping={mapping} theme={theme}>
    <Layout style={{flex: 1}}/>
  </ApplicationProvider>
);

export default App;
```

<hr>

## Related Articles

- [Using Theme](design-system/use-theme-variables)
- [Create Custom Theme](design-system/create-custom-theme)
- [Light Theme](design-system/light-theme)
- [Dark Theme](design-system/dark-theme)


