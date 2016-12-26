---
title: Customization
author: vl
sort: 901
group: Quick Start
template: article.jade
---

<a href="#" id="rkType"></a>

## rkType

Most of components support *rkType* prop which should contain string. 
String can consist of one or more types separated by space. 

For example: 

```html
import {RkButton} from 'react-native-ui-kit';

//... 

<RkButton rkType='outline small'>
  Say Hello
</RkButton>

```

In this case for `RkButton` will be applied two styles: *outline* that 
draws rounded border for button and *small* that reduces button size.

How to create your custom *rkType* defined in each component:

- *[RkButton](../button#custom)*  
- *[RkChoice](../choice#custom)*  
- *[RkTabView](../tab#custom)*  
- *[RkCard](../card#custom)*  
- *[RkTextInput](../input#custom)*  
- *[RKText](../text#custom)*  

If you get tired for example write rkType for each `RkButton` you can define
default *rkType* for component:
 
```javascript

import {RkConfig} from 'react-native-ui-kit';


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
 
Now each `RkText` and `RkButton` component without *rkType* 
prop will use *rkType* which you define in *myTheme* 
 

## Colors

*react-native-ui-kit* contains [material](https://material.io/guidelines/style/color.html#color-color-palette) colors.
 
Example:

```javascript 

import {RkConfig} from 'react-native-ui-kit';

<Text style={{color: RkConfig.colors.blue500}}>blue</Text>

```

You can define your own colors and use it in the same way as above.

Create custom colors:

```javascript 

RkConfig.setColor('primary', RkConfig.colors.blue500);
RkConfig.setColor('danger', RkConfig.colors.red500);
RkConfig.setColor('warning', RkConfig.colors.yellow500);
RkConfig.setColor('success', RkConfig.colors.green500);
RkConfig.setColor('border', '#ECECEC');

```

