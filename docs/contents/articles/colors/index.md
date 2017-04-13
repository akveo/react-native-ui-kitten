---
title: Colors and Styles
author: am
sort: 700
group: Styling
template: article.jade
---

### Colors

React Native UI Kitten has  contains [material colors](https://material.io/guidelines/style/color.html#color-color-palette) as constants. 

Color usage example:

```javascript
import {RkTheme} from 'react-native-ui-kitten';

//...

<Text style={{color: RkTheme.colors.blue500}}>blue</Text>
```

You can define your own colors and use it in the same way as above.

Custom color definition example:

```javascript
import {RkTheme} from 'react-native-ui-kitten';

//...

RkTheme.setColor('lightred', RkTheme.colors.red200);
RkTheme.setColor('firebrick', '#b22222');

```


### Styles

There are also some predefined color styles for quick use. They compiled from `RkTheme.colors` object into `RkTheme.styles`.
This object has predefined styles for `color`, `backgroundColor` and `borderColor`.

Here is example:

```javascript
import {RkTheme} from 'react-native-ui-kitten';

//...
<Text style={[RkTheme.styles.red200Bg, RkTheme.styles.red900Text]}>Large</Text>
```

#### Conventions:
- Use `%colorname%Bg` for `backgroundColor: %colorname%`
- Use `%colorname%Text` for `color: %colorname%`
- Use `%colorname%Border` for `borderColor: %colorname%`