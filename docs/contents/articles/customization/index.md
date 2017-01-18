---
title: Customization
author: vl
sort: 901
group: Quick Start
template: article.jade
---

<a href="#" id="rkType"></a>

### rkType

Most of the components in this framework contain *rkType* property.
For those who familiar with web, you can think of it as a HTML *class* property.
Basically the main idea is to split style definitions from jsx templates.
You configure *rkType*s in somewhere in your application and after that you're able to reuse that style in your components by just passing it as an input property.
As well, there's always a possibility to override styles for some specific component.

For example, consider this piece of code: 

```html
import {RkButton} from 'react-native-ui-kitten';

//... 

<RkButton rkType='outline small'>
  Say Hello
</RkButton>

```

In this case `RkButton` will have two styles: *outline* (style that 
draws rounded border for button) and *small* (one that reduces button size).

You're able to create your custom *rkType*s for specific components.
Each component that supports this feature has appropriate paragraph that describes how to do that:

- *[RkButton](../button#custom)*  
- *[RkChoice](../choice#custom)*  
- *[RkTabView](../tab#custom)*  
- *[RkCard](../card#custom)*  
- *[RkTextInput](../input#custom)*  
- *[RKText](../text#custom)*  

### Global settings

There's also a possibility to define global settings for each component that supports *rkType*. 
Example below shows how can you define some default styles for `RkButton` and `RkType`:
 
```javascript

import {RkConfig} from 'react-native-ui-kitten';


RkConfig.setType('text', 'white', {
  color: 'white'
});

RkConfig.setType('text', 'roboto', {
  fontFamily: 'roboto'
});

RkConfig.setTheme('myTheme', {
  text: {
    defaultType: 'roboto white'
  },
  button:{
    defaultType: 'outline small'
  }
});

```
 
Now each `RkText` and `RkButton` component can be used without *rkType* 
prop. But it will still be applied with styles defined in *myTheme*. Nice! 
 

### Colors

*react-native-ui-kitten* contains [material](https://material.io/guidelines/style/color.html#color-color-palette) colors as constants.
Look at the source code to view all colors available [RkConfig.colors](https://github.com/akveo/react-native-ui-kitten/blob/master/util/color.js)
 
Color usage example:

```javascript 

import {RkConfig} from 'react-native-ui-kitten';

<Text style={{color: RkConfig.colors.blue500}}>blue</Text>

```

You can define your own colors and use it in the same way as above.

Custom color definition example:

```javascript 

RkConfig.setColor('primary', RkConfig.colors.blue500);
RkConfig.setColor('danger',  RkConfig.colors.red500);
RkConfig.setColor('warning', RkConfig.colors.yellow500);
RkConfig.setColor('success', RkConfig.colors.green500);
RkConfig.setColor('border', '#ECECEC');

```

