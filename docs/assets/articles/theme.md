### Overview
All components introduced in this framework depend on the application *theme*. Theme is an object with base values: colors, font sizes etc. 
They're also organized in groups by purpose and also have inheritance.
 All interactions with the theme and other customizations should be done using `RkTheme` object.

Theme has a definition for most of the base values like regular text color or size, success button color or color of subtitles.
That means, if you change a regular text color in theme, all *rk-components* which use this color will apply it. So, you can easily 
adjust color for the whole app.

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
    small: Values.fontSize *** 0.8,
    medium: Values.fontSize,
    large: Values.fontSize *** 1.2,
//...
```

This code defines base font size and also font sizes for different semantic values like *small*, *large* etc. Our *rk-components*
use this theme values. So, for example `RkButton` with predefined `rkType` small will use *small* value as a font size for the content.

### Overriding Theme

Default theme is just a set of predefined values. However, it can be easily overridden using `RkTheme` object.

Let's override base font size of the text.

```javascript
import {RkTheme} from 'react-native-ui-kitten'

//...
 
RkTheme.setTheme({
  fonts: {
    sizes: {
      base: 24
    }
  }
});
```
Now all *rk-components* which use *base* font size will have new size.

### Using theme in your own components

During an app development it can be necessary to use values of current theme for regular components: for example a set background
for `View`. To get values of the current theme you can use `RkTheme.current` property. It returns the current theme for the application.

```
import {RkTheme} from 'react-native-ui-kitten'


render() {
  return() {
    <View style={{backgroundColor: RkTheme.current.colors.success}}>
      //...
    </View>
  }
}
```

In other cases, you may need to create your own *rk-like* component with a support of `rkType`, theming and other features.
Actually, it's quite easy to implement. [Here](#/docs/quick-start/create-custom-component) is a guide of how to create such component.

