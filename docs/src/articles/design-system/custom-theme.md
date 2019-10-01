# Create Custom Theme

Custom theme creation is a very similar process to [Theme Customization](design-system/customize-theme).
Only in this case, we suggest following simple but very important rules so that we can minimize the number of necessary changes 
and avoid repeated code.

Before we start, let's pretend we want to create an `aquamarine` theme with a violet primary color. 
<hr>

## Select parent Theme

In order to minify the amount of work, parent theme selection is a very important step.
Though it is very simple - for colored and dark themes - use `dark` base theme, otherwise - `light` theme.
In our case `aquamarine` theme is a colored one, let's use `dark` as a parent.

<hr>

## Create a Theme object

Now, let's create the new theme in `theme.js`:

```js
import { dark } from '@eva-design/eva';

export const aquamarine = {
  ...dark, // <- use dark as a parent theme
};

```

Now the new theme is available, let's modify it.
<hr>

## Start with Basic

Basic shades are one of the most important as they are the source for backgrounds, borders and text colors.
In the dark theme, text colors utilize the upper part of the shades (whitish colors)
and backgrounds the lower part.

Let's modify them and put our aquamarine colors, starting with white for `color-basic-100` and finishing with almost black
for `color-basic-1100`:

```js
import { dark } from '@eva-design/eva';

export const aquamarine = {
  ...dark,
  
  "color-basic-100": "white",
  "color-basic-200": "#eefafc",
  "color-basic-300": "#e8f5fa",
  "color-basic-400": "#d6e6f2",
  "color-basic-500": "#c7dbeb",
  "color-basic-600": "#a9c0db",
  "color-basic-700": "#4f969e",
  "color-basic-800": "#336a77",
  "color-basic-900": "#295c66",
  "color-basic-1000": "#244555",
  "color-basic-1100": "#121a2b",
};
```

<hr>

## Tweak backgrounds

In a case we need to tweak the color more accurately, we can change how basic colors are used.
For example, we can make the theme backgrounds and borders lighter, by using basic color lighter for one grade up:  

```js
import { dark } from '@eva-design/eva';

export const aquamarine = {
  ...dark,
  
  "color-basic-100": "white",
  "color-basic-200": "#eefafc",
  "color-basic-300": "#e8f5fa",
  "color-basic-400": "#d6e6f2",
  "color-basic-500": "#c7dbeb",
  "color-basic-600": "#a9c0db",
  "color-basic-700": "#4f969e",
  "color-basic-800": "#336a77",
  "color-basic-900": "#295c66",
  "color-basic-1000": "#244555",
  "color-basic-1100": "#121a2b",
  
  "background-basic-color-1": "$color-basic-700", // <- 800 by default
  "background-basic-color-2": "$color-basic-800", // <- 900 by default
  "background-basic-color-3": "$color-basic-900", // <- etc
  "background-basic-color-4": "$color-basic-100",

  "border-basic-color-1": "$color-basic-700",
  "border-basic-color-2": "$color-basic-800",
  "border-basic-color-3": "$color-basic-900",
  "border-basic-color-4": "$color-basic-1000",
  "border-basic-color-5": "$color-basic-1100",
};

```

<hr>

## Text Colors

Texts color may also be affected by the backgrounds change. In our case, `disabled` text is now the same
color as a background. Let's make it one shade lighter: 

```js
import { dark } from '@eva-design/eva';

export const aquamarine = {
  ...dark,
  
  "color-basic-100": "white",
  "color-basic-200": "#eefafc",
  "color-basic-300": "#e8f5fa",
  "color-basic-400": "#d6e6f2",
  "color-basic-500": "#c7dbeb",
  "color-basic-600": "#a9c0db",
  "color-basic-700": "#4f969e",
  "color-basic-800": "#336a77",
  "color-basic-900": "#295c66",
  "color-basic-1000": "#244555",
  "color-basic-1100": "#121a2b",
  
  "background-basic-color-1": "$color-basic-700",
  "background-basic-color-2": "$color-basic-800",
  "background-basic-color-3": "$color-basic-900",
  "background-basic-color-4": "$color-basic-100",

  "border-basic-color-1": "$color-basic-700",
  "border-basic-color-2": "$color-basic-800",
  "border-basic-color-3": "$color-basic-900",
  "border-basic-color-4": "$color-basic-1000",
  "border-basic-color-5": "$color-basic-1100",
  
  "text-disabled-color": "$color-basic-600",
};
```

<hr>

## Primary Color

Lastly, let's make the final change and replace the primary blue color with desired violet one:

```js
import { dark } from '@eva-design/eva';

export const aquamarine = {
  ...dark,
  
  "color-primary-100": "#faf7ff", // <- primary violet shades
  "color-primary-200": "#ece3ff",
  "color-primary-300": "#d5bfff",
  "color-primary-400": "#b18aff",
  "color-primary-500": "#a16eff",
  "color-primary-600": "#7b51db",
  "color-primary-700": "#5a37b8",
  "color-primary-800": "#3e2494",
  "color-primary-900": "#29157a",
  
  "color-basic-100": "white",
  "color-basic-200": "#eefafc",
  "color-basic-300": "#e8f5fa",
  "color-basic-400": "#d6e6f2",
  "color-basic-500": "#c7dbeb",
  "color-basic-600": "#a9c0db",
  "color-basic-700": "#4f969e",
  "color-basic-800": "#336a77",
  "color-basic-900": "#295c66",
  "color-basic-1000": "#244555",
  "color-basic-1100": "#121a2b",
  
  "background-basic-color-1": "$color-basic-700",
  "background-basic-color-2": "$color-basic-800",
  "background-basic-color-3": "$color-basic-900",
  "background-basic-color-4": "$color-basic-100",

  "border-basic-color-1": "$color-basic-700",
  "border-basic-color-2": "$color-basic-800",
  "border-basic-color-3": "$color-basic-900",
  "border-basic-color-4": "$color-basic-1000",
  "border-basic-color-5": "$color-basic-1100",
  
  "text-disabled-color": "$color-basic-600",
};

```
Simple as that, here's our result:

![image](assets/images/articles/design-system/aquamarine-theme.png)

That's it. In a similar way, the rest of the available theme variables could be changed to achieve the desired result.

<hr>

## Related Articles

- [Use Theme](design-system/use-theme-variables)
- [Customize Theme](design-system/customize-theme)
- [Light Theme](design-system/light-theme)
- [Dark Theme](design-system/dark-theme)
