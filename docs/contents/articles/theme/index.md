---
title: Theme
author: am
sort: 702
group: Styling
template: article.jade
---

### Overview

React Native UI Kitten has a strong support for customizations. All components introduced in this framework depends on
app's *theme*. Theme - is an object with some base values: colors, font sizes etc. They also organized in groups by meaning and
also has inheritance. All interactions with theme and other customization work should be done using `RkTheme` object.

Theme has definition for most of base values like regular text color or size, success button color or color of subtitles.
That means if you change regular text color in theme - all *rk-components* which use this color will apply it. So you can easily 
adjust color for whole app.

Here is an example from our default theme:
```javascript
import {RkTheme} from 'react-native-ui-kitten'

//...

let Values = {
  fontSize:15
};

//...
fonts: {
  sizes: {
    base: Values.fontSize,
    small: Values.fontSize * .8,
    medium: Values.fontSize,
    large: Values.fontSize * 1.2,
//...
```

This code defines base font size and also font sizes for different semantic values lie *small*, *large* etc. Our *rk-components*
use this theme values. So for example `RkButton` with predefined `rkType` small will use *small* value as font size for content.

### Overriding Theme

Default theme is just a set of predefined values. However it can be easily overridden using `RkTheme` object.

Let's override base font size of text.

```javascript
import {RkTheme} from 'react-native-ui-kitten'

//...
 
RkTheme.setTheme({
  fonts:{
    sizes:{
      base: 24
    }
  }
});
```
Now all *rk-components* which use *base* font size will have new size.


### Using theme explicitly

Values defined in theme can be used for setting values to non *rk-components*:

```javascript
import {RkTheme} from 'react-native-ui-kitten'

//...

<Text style={{fontSize: RkTheme.current.fonts.sizes.large}}>Large</Text>
```
**Important!** Please do not use values from `RkTheme` inside `StyleSheet.create` after overriding default theme. Overridden values
will not apply due stylesheet logic mechanism.


### Using theme in your own components

During app development you may need to create new components. And it would be nice to have theme support for them also.
Actually it's possible and easy to implement. [Here is guide](../guide/index.md) of how to create component which
 will use all our features.


### Colors

`RkTheme` also contains predefined colors and some predefined styles that you can use. [Here](../colors/index.md) is more info about it.

### Members

<div class="doc-prop">
    <p><strong>current</strong></p>
    <p>Return current theme object</p>
</div>

<div class="doc-prop">
    <p><strong>styles</strong></p>
    <p>Return object with automatically compiled styles</p>
</div>

<div class="doc-prop">
    <p><strong>colors</strong></p>
    <p>Return object with set of material colors</p>
</div>

<div class="doc-prop">
    <p><strong>setTheme(theme)</strong></p>
    <p>Sets user-defined theme as current. This method merge user-defined theme with default theme.</p>
</div>

<div class="doc-prop">
    <p><strong>setType(element, name, value)</strong></p>
    <p>Adds new <strong>rkType</strong> for rk-component.</p>
    <p>element - component name</p>
    <p>name - name of <strong>rkType</strong></p>
    <p>value - object with values</p>
</div>

<div class="doc-prop">
    <p><strong>registerComponent(element, types)</strong></p>
    <p>Register new component in <strong>RkTheme</strong> object and add user-defined types for this component</p>
    <p>element - component name </p>
    <p>types - function which returns object with user-defined types</p>
</div>

<div class="doc-prop">
    <p><strong>setColor(name, value)</strong></p>
    <p>Add user-defined color to list of predefined colors</p>
</div>