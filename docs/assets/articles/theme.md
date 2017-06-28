### Overview
All components introduced in this framework depends on application *theme*. Theme - is an object with some base values: colors, font sizes etc. 
They also organized in groups by meaning and also has inheritance.
 All interactions with theme and other customization work should be done using `RkTheme` object.

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
    small: Values.fontSize *** 0.8,
    medium: Values.fontSize,
    large: Values.fontSize *** 1.2,
//...
```

This code defines base font size and also font sizes for different semantic values like *small*, *large* etc. Our *rk-components*
use this theme values. So for example `RkButton` with predefined `rkType` small will use *small* value as font size for content.

### Overriding Theme

Default theme is just a set of predefined values. However it can be easily overridden using `RkTheme` object.

Let's override base font size of text.

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

During app development it can be necessary to use values of current theme for regular components: for example - set background
for `View`. To get values of current theme you can use `RkTheme.current` property. It returns current theme for application.

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

In other cases you may need to create your own *rk-like* component with support of `rkType`, theming and other features.
Actually it's possible and easy to implement. Here is guide of how to create such component.

