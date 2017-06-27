### Overview
React Native UI Kitten has a strong support for customizations. All components introduced in this framework depends on
app's *theme*. Theme - is an object with some base values: colors, font sizes etc. They also organized in groups by meaning and
also has inheritance. All interactions with theme and other customization work should be done using `RkTheme` object.

Theme has definition for most of base values like regular text color or size, success button color or color of subtitles.
That means if you change regular text color in theme - all *rk-components* which use this color will apply it. So you can easily 
adjust color or  for whole app.

Here is an example from our default theme:
```javascript
import {RkTheme} from 'react-native-ui-kitten'

//...

let Values = {
  fontSize: 15
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

### Using theme in your own components

During app development it can be necessary to create new theme-dependent components. And it would be nice to have theme support for them also.
Actually it's possible and easy to implement. [LINK] of how to create component which will use all our features.

