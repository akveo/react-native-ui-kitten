# Branding

While UI Kitten supports 2 built-in themes provided by Eva Design System, you still able to create your own, based on the needs of your brand. In this guide, we will learn how to create a custom theme, apply custom fonts and more.

<hr>

## Theming

Eva Design System provides a powerful and easy to use deep learning tool for generating colors. Navigate to <a href="https://colors.eva.design" target="_blank">colors.eva.design</a> to generate a UI Kitten theme.

Start with picking the primary color of the application.

![image](assets/images/articles/guides/branding-pick-color.gif)

The same way you can pick success, info, warning and danger colors.

When the theme is ready, click the `Export` button and select `JSON` option.

![image](assets/images/articles/guides/branding-export-theme.gif)

Copy the downloaded file into your project.
To apply custom theme, go to the `App.js` and paste the following code:

```js
import React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Button } from 'react-native-ui-kitten';
import { default as appTheme } from './custom-theme.json'; // <-- Import app theme

const theme = { ...lightTheme, ...appTheme };

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

With the code above we use Eva Light theme as a base theme and override its semantic colors with a custom theme.
You can use Eva Dark theme as a base if you need darker backgrounds.

Reload the app to review the changes!

<hr>

## Fonts

If your app is based on custom fonts, start with copying `.ttf` file and paste it into `assets` directory. 
Now, by following React Native CLI 
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
    "text-font-family": "FONT-NAME"
  }
}
```

The go to the `App.js` and paste the code below: 

```js
import React from 'react';
import { mapping, light as theme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Button } from 'react-native-ui-kitten';
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

## Conclusion

In this guide, you learned how to configure custom theme with Eva Design System. The complete list of available theme variables can be found in <a href="https://akveo.github.io/react-native-ui-kitten/docs/design-system/light-theme" target="_blank">Light Theme</a> and <a href="https://akveo.github.io/react-native-ui-kitten/docs/design-system/dark-theme" target="_blank">Dark Theme</a> docs.


By moving to the [next guide](guides/icon-packages), you will learn how to use icon packages in React Native.
