# Eva Design System Theme

In Eva Design System a **theme** is a set of semantic variables and connections between them, that represents the application's look & feel to achieves the following goals:

- create new visual themes easily;
- flexibly change look & feel of the application by managing variables, without changing components' styles;
- switch between visual themes in app runtime without page reload;
- support of React Native style properties.

<hr>

## A Theme

In UI Kitten terms - **theme** is a json or a JavaScript object, structured in a particular way. Here's a gist of how it looks like:

```json
{
  // ...
  "color-danger-100": "#fff2f2",
  "color-danger-200": "#ffd6d9",
  "color-danger-300": "#ffa8b4",
  "color-danger-400": "#ff708d",
  // ...
  "color-danger-900": "#700940",

  /* Basic colors - for backgrounds and borders and texts */

  "color-basic-100": "white",
  "color-basic-200": "#f7f8fa",
  "color-basic-300": "#edf0f4",
  "color-basic-400": "#dde1eb",
  // ...
  "color-basic-1100": "#131729",

  /* Status colors states - focus, hover, default, active, disabled  */

  "color-primary-focus": "$color-primary-700",
  "color-primary-hover": "$color-primary-400",
  "color-primary-default": "$color-primary-500",
  "color-primary-active": "$color-primary-600",
  "color-primary-disabled": "$color-primary-300"
  // ...
}
```

The dollar sign before the value of some variable means it references on some another variable which is available in scope of theme.

Each theme is divided into the following semantic groups:

- Colors
- Backgrounds & Borders
- Text Colors
- Fonts & Text Styles

<hr>

## Colors

All available color within the theme. 5 semantic colors (`primary`, `success`, `info`, `warning`, `danger`) and `basic` color (backgrounds and texts).
Each color has a pallet of 9 shades, except for `basic`, which has 11 shades. These colors mostly used by `status` variants of the components.

Primary color shades:

```json
{
  "color-primary-100": "#f2f6ff",
  "color-primary-200": "#d9e4ff",
  "color-primary-300": "#a6c1ff",
  "color-primary-400": "#598bff",
  "color-primary-500": "#3366ff",
  "color-primary-600": "#284de0",
  "color-primary-700": "#2541cc",
  "color-primary-800": "#192f9e",
  "color-primary-900": "#14236e"
}
```

You can also tune colors used for element states:

```json
{
  "color-primary-focus": "$color-primary-700",
  "color-primary-hover": "$color-primary-400",
  "color-primary-default": "$color-primary-500",
  "color-primary-active": "$color-primary-600",
  "color-primary-disabled": "$color-primary-300"
}
```

You can adjust these settings for each of the colors, to make states use lighter or darker colors. 

<hr>

## Backgrounds & Borders

A theme has 3 backgrounds (`basic`, `alternative`, `primary`) each of 4 shades and also 3 borders, each of 5 shades (background shades count + 1).
`basic` and `alternative` backgrounds and borders utilize `basic` color shades as a source. `primary` backgrounds and borders use `primary` color.
Basic backgrounds and borders heavily used by components (cards, accordions, menu, etc), when alternative (tooltips) and primary only for particular use cases,
to distinguish some of the components.

Basic backgrounds and borders:
```json
{
  "background-basic-color-1": "$color-basic-100",
  "background-basic-color-2": "$color-basic-200",
  "background-basic-color-3": "$color-basic-300",
  "background-basic-color-4": "$color-basic-400",
  
  "border-basic-color-1": "$color-basic-100",
  "border-basic-color-2": "$color-basic-200",
  "border-basic-color-3": "$color-basic-300",
  "border-basic-color-4": "$color-basic-400",
  "border-basic-color-5": "$color-basic-500"
}
```

the most used of these are:
 
- `background-basic-color-1` - the lightest one, usually used for top sitting elements - cards, headers, etc. 
- `background-basic-color-2` - for background of the layout and input controls (inputs, checkboxes, etc)

And vice-versa for dark themes:

```json
{
  "background-basic-color-1": "$color-basic-800", // <- notice how we start
  "background-basic-color-2": "$color-basic-900", // with the end part
  "background-basic-color-3": "$color-basic-1000",// of the basic shades
  "background-basic-color-4": "$color-basic-1100",
  
  "border-basic-color-1": "$color-basic-800",
  "border-basic-color-2": "$color-basic-900",
  "border-basic-color-3": "$color-basic-1000",
  "border-basic-color-4": "$color-basic-1100",
  "border-basic-color-5": "$color-basic-1100"
}
```

<hr>  

## Text Colors

There are 5 colors within the theme: `basic` - main text color, used on top of `basic` backgrounds `alternate` - alternative color used on top of `alternate` backgrounds,
`control` - used on top of `status` colors (`primary`, `success`, etc), `disabled` color - to indicate text/component disabled state
and `hint` - for secondary texts (for example placeholders and captions).
 
Text colors use `basic` shades as a source:

```json
{
  "text-basic-color": "$color-basic-1000",
  "text-alternate-color": "$color-basic-100",
  "text-control-color": "$color-basic-100",
  "text-disabled-color": "$color-basic-500",
  "text-hint-color": "$color-basic-700"
}
```

<hr>

## Text Styles

There are 13 text styles:
- 6 `heading` styles, used by h1-h6 elements 
- 2 `subtitle` styles, used as a text of most of controls (inputs, menus, etc)
- 2 `paragraph` styles, regular text
- 2 `caption` styles, used by smaller texts, like tooltip or input caption
- `label` style, used by label element

Each styles describes text `fontSize`, `fontWeight` and `lineHeight`, for instance, there is a final style applied by `c1` (caption 1) `Text` component:

```json
{
  "fontSize": 12,
  "fontWeight": "400",
  "text-caption-line-height": 16
}
```

<hr>

## Related Articles

- [Branding](guides/branding)
- [Light Theme](design-system/light-theme)
- [Dark Theme](design-system/dark-theme)

