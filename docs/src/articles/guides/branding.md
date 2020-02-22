# Branding

While UI Kitten supports 2 built-in themes provided by Eva Design System, you still able to create your own, based on the needs of your brand. In this guide, we will learn how to create a custom theme, apply custom fonts and more.

<hr>

## Theming

Before we start, let's pretend we want to create a pure dark theme with a violet primary color.

### Brand colors

Eva Design System provides a powerful and easy to use deep learning tool for generating colors. Navigate to <a href="https://hubs.ly/H0n6DdP0" target="_blank">colors.eva.design</a> to generate a UI Kitten theme.

Start with picking the primary color of the application. Our choice is violet.

![image](assets/images/articles/guides/branding-pick-color.gif)

The same way you can pick success, info, warning and danger colors. In this example, we just trust color generator and leave it as it is.

When the theme is ready, click the `Export` button and select `JSON` option.

![image](assets/images/articles/guides/branding-export-theme.gif)

Copy the downloaded file into your project.
To apply custom theme, go to the `App.js` and paste the following code:

```js
import React from 'react';
import { ApplicationProvider, Layout, Button } from '@ui-kitten/components';
import { mapping, dark as darkTheme } from '@eva-design/eva';
import { default as appTheme } from './custom-theme.json'; // <-- Import app theme

const theme = { ...darkTheme, ...appTheme };

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Button>HOME</Button>
  </Layout>
);

const App = () => (
  <ApplicationProvider mapping={mapping} theme={theme}>
    <HomeScreen/>
  </ApplicationProvider>
);

export default App;
```

Notice that with the code above in order to minify the amount of work, we used <a href="https://akveo.github.io/react-native-ui-kitten/docs/design-system/eva-dark-theme" target="_blank">Eva Dark</a> as parent theme.

### Background colors

With Eva, backgrounds, borders and text colors are defined with Basic shades. In the dark theme, text colors utilize the upper part of the shades (whitish colors) and backgrounds the lower part.

Let's modify them and put our pure dark colors, starting with white for color-basic-100 and finishing with almost black for color-basic-1100. Open `custom-theme.json` and add the following theme variables.

```json
{
  "color-basic-100": "#FFFFFF",
  "color-basic-200": "#F5F5F5",
  "color-basic-300": "#F5F5F5",
  "color-basic-400": "#D4D4D4",
  "color-basic-500": "#B3B3B3",
  "color-basic-600": "#808080",
  "color-basic-700": "#4A4A4A",
  "color-basic-800": "#383838",
  "color-basic-900": "#292929",
  "color-basic-1000": "#1F1F1F",
  "color-basic-1100": "#141414"
}
```

In order to finish modifying Basic shades, we also need to add basic-transparent variables to make it work properly. Pick color-basic-600 value and transform it to rgba format. You can use web tools like <a href="http://hex2rgba.devoth.com" target="_blank">hex2rgba</a> for this case. 

```json
{
   "color-basic-transparent-100": "rgba(128, 128, 128, 0.08)",
   "color-basic-transparent-200": "rgba(128, 128, 128, 0.16)",
   "color-basic-transparent-300": "rgba(128, 128, 128, 0.24)",
   "color-basic-transparent-400": "rgba(128, 128, 128, 0.32)",
   "color-basic-transparent-500": "rgba(128, 128, 128, 0.4)",
   "color-basic-transparent-600": "rgba(128, 128, 128, 0.48)"
}
```

In a case we need to tweak the color more accurately, we can change how basic colors are used. For example, we can make the theme backgrounds and borders lighter, by using basic color lighter for one grade up:

```json
{
  "background-basic-color-1": "$color-basic-700", // <- 800 by default
  "background-basic-color-2": "$color-basic-800", // <- 900 by default
  "background-basic-color-3": "$color-basic-900", // <- etc
  "background-basic-color-4": "$color-basic-1000"
}
```                            

Notice, we use `$` sign to refer other theme variable in JSON. This will be handled by Eva.

### Text colors

Texts color may also be affected by the backgrounds change. In our case, `disabled` text is now the same color as a background. Let's make it one shade lighter:

```json
{
  "text-disabled-color": "$color-basic-transparent-600"  // <- 700 is default
}
```

That's it! Pure dark theme is done. Let's reload the app to review the changes.

![image](assets/images/articles/guides/branding-theme-preview.png)

The complete list of theme variables can be found at <a href="https://akveo.github.io/react-native-ui-kitten/docs/design-system/eva-light-theme" target="_blank">Light</a> or <a href="https://akveo.github.io/react-native-ui-kitten/docs/design-system/eva-dark-theme" target="_blank">Dark</a> theme docs.

<hr>

## Fonts

If your app is based on custom fonts, start with copying `.ttf` file and paste it into `assets` directory. In this example, we're going to use <a href="https://fonts.google.com/specimen/Roboto" target="_blank">Roboto</a>.


By following React Native CLI 
<a href="https://github.com/react-native-community/cli/blob/master/docs/projects.md#project" target="blank">project guides</a>
create a `react-native.config.js` file and paste the following code:

```js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets'],
};
```

Now we need to link assets with native iOS and Android projects. Staying at the root of the application, run `npx react-native link`.

When the fonts are linked create a `custom-mapping.json` file and paste the code below to apply fonts to UI Kitten components. 

```json
{
  "strict": {
    "text-font-family": "Roboto-Regular"
  }
}
```

The go to the `App.js` and paste the code below: 

```js
import React from 'react';
import { ApplicationProvider, Layout, Button } from '@ui-kitten/components';
import { mapping, light as theme } from '@eva-design/eva';
import { default as customMapping } from './custom-mapping.json'; // <-- Import custom mapping

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Button>HOME</Button>
  </Layout>
);

const App = () => (
  <ApplicationProvider 
    mapping={mapping}
    theme={theme}
    customMapping={customMapping}>
    <HomeScreen/>
  </ApplicationProvider>
);

export default App;
```

<hr>

## Conclusion

In this guide, you learned how to configure custom theme with Eva Design System. The complete list of available theme variables can be found in <a href="https://akveo.github.io/react-native-ui-kitten/docs/design-system/eva-light-theme" target="_blank">Light Theme</a> and <a href="https://akveo.github.io/react-native-ui-kitten/docs/design-system/eva-dark-theme" target="_blank">Dark Theme</a> docs.

By moving to the [next guide](guides/icon-packages), you will learn how to use icon packages in React Native.
