# Branding

UI Kitten supports 2 built-in themes provided by Eva Design System.
You can create your own, based on the needs of your brand.
In this guide, we will learn how to create a custom theme, apply custom fonts and more.

<div class="note note-info">
  <div class="note-title">NOTE</div>
  <div class="note-body">
   We recommend paying enough attention on this guide in order to have better developer experience when using UI Kitten.
   This guide describes how you can get rid of using `style` properties in favor of theme.
  </div>
</div>

<hr>

## Primary Colors

Before we start, let's pretend we want to create a deep orange theme. Just like the one used in this documentation, but with the dark mode in mind.

Brand colors define the main look and feel of the application. In Eva, we have the following semantic colors: primary, success, info, warning, and danger. In general, `primary` is used as the main color for buttons, inputs and other controls, and the rest of them have a supporting role and usually are used within forms validation.
 
 These colors are widely used by UI Kitten components when working with `status` properties, which always have their default value. For instance, the default Button is primary, and Input in a focused state is also primary. Other controls are also configured by following this rule. This means that changing only a primary color covers the most of styling use cases and leads to reducing the need for using `style` properties when configuring components.

The easiest way to create UI Kitten theme is to use <a href="https://hubs.ly/H0n6DdP0" target="_blank">Eva Design System color generator</a>.

Start with picking the primary color of the application. Our choice is orange.

![image](assets/images/articles/guides/branding-pick-color.gif)

The same way you can pick the rest of semantic colors. In this example, we just trust the color generator and leave it as it is.

When the theme is ready, click the `Export` button and select `JSON` option.

![image](assets/images/articles/guides/branding-export-theme.gif)

Copy the downloaded file into your project.
To apply theme, go to the `App.js` and paste the following code:

```js
import React from 'react';
import { ApplicationProvider, Layout, Button } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { default as appTheme } from './theme.json'; // <-- Import app theme

const theme = { ...eva.dark, ...appTheme };

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Button>HOME</Button>
  </Layout>
);

export default () => (
  <ApplicationProvider {...eva} theme={theme}>
    <HomeScreen/>
  </ApplicationProvider>
);
```

Notice that in this example we use a spread operator to combine <a href="https://akveo.github.io/react-native-ui-kitten/docs/design-system/eva-dark-theme" target="_blank">Eva Dark</a> with our deep orange theme. This will use Eva Dark as a base theme and helps us minify the amount of work.

As a result, Only by changing primary colors, we made UI Kitten components to look like this.

![image](assets/images/articles/guides/branding-overview-primary.png)

<hr>

## Backgrounds and Borders

Within Eva, backgrounds, borders are controlled with Basic shades.

Regarding UI Kitten, Inputs, Pickers and Layout use these colors as background and borders in its default state.
Also, Navigation components like TabBar or BottomNavigation use these colors as its background.
This makes this step important, as it will help you reduce the usage of `style` properties when configuring components.

Let's modify them with dark colors, starting with white for color-basic-100 and finishing with almost black for color-basic-1100. Open `theme.json` and add the following theme variables.

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

To finish modifying Basic shades, we also need to add basic-transparent variables.
This set of colors is mostly required by disabled controls.
 
Pick color-basic-600 value and transform it to rgba format. You can use web tools like <a href="http://hex2rgba.devoth.com" target="_blank">hex2rgba</a> for this case. 

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

Let's see what we have now.

![image](assets/images/articles/guides/branding-overview-backgrounds.png)

<hr>

## Text and Icons

As well as Backgrounds, Text and Icon colors are controlled by Basic shades.
In a dark theme, text colors utilize the upper part of the shades (whitish colors) and backgrounds in the lower part.

Sometimes it is required to make Text lighter or darker without changing background colors.
This can be done by configuring extra text variables.

Let's take a look at the most useful of them:
- `text-basic-color` used everywhere as the default text color.
- `text-hint-color` used for placeholders, labels, captions, subtitles and icons in its default state.
- `text-disabled-color` used within every control in a disabled state.

Within UI Kitten, text color variables are used with consistency between components in mind and are used as described above.  So, to tweak text more accurately,
we may add these variables to `theme.json`.
Let's make default text and hints darker.
```json
{
  "text-basic-color": "$color-basic-500", // <-- 100 by default
  "text-hint-color": "$color-basic-700" // <-- 600 by default
}
```

Let's see the result.
![image](assets/images/articles/guides/branding-overview-text.png)

<hr>

## Fonts

If your app is based on custom fonts, start with copying `.ttf` file and paste it into `assets` directory.
 n this example, we're going to use <a href="https://fonts.google.com/specimen/Roboto" target="_blank">Roboto</a>.

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

Now we need to link assets with native iOS and Android projects. Run `npx react-native link` from the project root.
When the fonts are linked create a `mapping.json` file and paste the code below to apply fonts to UI Kitten components. 

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
import * as eva from '@eva-design/eva';
import { default as mapping } from './mapping.json';

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Button>HOME</Button>
  </Layout>
);

export default () => (
  <ApplicationProvider 
    {...eva}
    theme={eva.dark}
    customMapping={customMapping}>
    <HomeScreen/>
  </ApplicationProvider>
);
```

### Text Categories

Mapping may contain more typography variables if needed.
For instance, there are 13 text categories, that UI Kitten Text supports.
- `h1...h6` - Headings. 
- `s1` and `s2` - Subtitles.
- `p1` and `p2` - Paragraphs. In UI Kitten - placeholders,
- `c1` and `c2` - Captions. In UI Kitten - tabs and Input captions.
- `label` - Label. In UI Kitten - Input labels.

You may bring your styles to them with saving consistency between UI Kitten components. In `mapping.json`:
```json
{
  "strict": {
    "text-heading-1-font-size": 36,
    "text-heading-1-line-height": 48,
    "text-heading-1-font-weight": "800",
    // Same for `h2...h6`
  
    "text-subtitle-1-font-size": 15,
    "text-subtitle-1-line-height": 24,
    "text-subtitle-1-font-weight": "600",
    // Same for `s2`
  
    "text-paragraph-1-font-size": 15,
    "text-paragraph-1-line-height": 20,
    "text-paragraph-1-font-weight": "400",
    // Same for `p2`
  
    "text-caption-1-font-size": 12,
    "text-caption-1-line-height": 16,
    "text-caption-1-font-weight": "400",
    // Same for `c2`
  
    "text-label-font-size": 12,
    "text-label-line-height": 16,
    "text-label-font-weight": "800"
  }
}
```

### Multiple Fonts

Adding font family for each category is not supported, but it is possible to configure custom mapping for Text component like this.
```json
{
  "strict": { ... },
  "components": {
    "Text": {
      "appearances": {
        "default": {
          "mapping": {},
          "variantGroups": {
            "category": {
              "h6": {
                "fontFamily": "Roboto-Bold"
              }
            }
          }
        }
      }
    }
  }
}
```

<hr>

## Definition of Theme

There are 9 shades for each semantic color (primary in this example), and 6 shades for the same color with transparency.
These colors define the rules of how another theme variables are used.
```json
{
  "color-primary-100": "#FFECD2",
  "color-primary-200": "#FFD3A6",
  "color-primary-300": "#FFB579",
  "color-primary-400": "#FF9758",
  "color-primary-500": "#FF6721",
  "color-primary-600": "#DB4818",
  "color-primary-700": "#B72F10",
  "color-primary-800": "#931A0A",
  "color-primary-900": "#7A0C06",

  "color-primary-transparent-100": "rgba(255, 103, 33, 0.08)",
  "color-primary-transparent-200": "rgba(255, 103, 33, 0.16)",
  "color-primary-transparent-300": "rgba(255, 103, 33, 0.24)",
  "color-primary-transparent-400": "rgba(255, 103, 33, 0.32)",
  "color-primary-transparent-500": "rgba(255, 103, 33, 0.4)",
  "color-primary-transparent-600": "rgba(255, 103, 33, 0.48)"
}
```

Also, there are 5 stateful color variables to define the color of the component for a particular state.
These colors are mostly used to define background colors.
Notice, that we use `$` sign to refer shade variables. This is handled by UI Kitten.
```json
{
  "color-primary-focus": "$color-primary-600",
  "color-primary-hover": "$color-primary-400",
  "color-primary-default": "$color-primary-500",
  "color-primary-active": "$color-primary-600",
  "color-primary-disabled": "$color-basic-transparent-300"
}
```

Background colors are always used with its borders.
```json
{
  "color-primary-focus-border": "$color-primary-700",
  "color-primary-hover-border": "$color-primary-hover",
  "color-primary-default-border": "$color-primary-default",
  "color-primary-active-border": "$color-primary-active",
  "color-primary-disabled-border": "$color-primary-disabled"
}
```

There is an extra set of variables to define background colors for containers.
For instance, `background-basic-color-2` defines the background color for Layout component, if it's `level` equals 2.
```json
{
  "background-basic-color-1": "$color-basic-800",
  "background-basic-color-2": "$color-basic-900",
  "background-basic-color-3": "$color-basic-1000",
  "background-basic-color-4": "$color-basic-1100"
}
```

<hr>

## Conclusion

In this guide, you learned how to configure custom theme with Eva Design System. The complete list of available theme variables can be found in <a href="https://akveo.github.io/react-native-ui-kitten/docs/design-system/eva-light-theme" target="_blank">Light Theme</a> and <a href="https://akveo.github.io/react-native-ui-kitten/docs/design-system/eva-dark-theme" target="_blank">Dark Theme</a> docs.

By moving to the [next guide](guides/icon-packages), you will learn how to use icon packages in React Native.
