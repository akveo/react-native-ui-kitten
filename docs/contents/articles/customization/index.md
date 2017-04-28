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
Our components already have a set of predefined rkTypes. 
Or you can configure *rkType*s in somewhere in your application and after that you're able to reuse that style in your components by just passing it as an input property.
As well, there's always a possibility to override types for some specific component.

For example, consider this code: 

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
Here is example with creating *rkType* for rkButton:

```html
import {RkButton, RkTheme} from 'react-native-ui-kitten';

let accent = '#ed1c4d';

RkTheme.setType('RkButton', '   accent', {
  backgroundColor: accent,
  color: 'white'
});

//...

<RkButton rkType='accent'>
  Click me.
</RkButton>
```
Each rk-component that supports this feature has appropriate paragraph that describes details about customization:

- *[RkButton](../button#custom)*  
- *[RKText](../text#custom)*  
- *[RkTextInput](../input#custom)*  
- *[RkChoice](../choice#custom)*  
- *[RkModalImg](../image#custom)*  
- *[RkTabView](../tab#custom)*  
- *[RkCard](../card#custom)*  


### Themes

All base *rkTypes* depends on theme of application. *Theme* contains base values (colors, fontSizes etc) for all Rk-components.
You can easily override values in theme or even define your own theme using *[RkTheme](../theme)*.

### Platform-dependent styles

In some cases it may be necessary to write different styles depending on current platform. There is possibility to define 
platform dependent value. Let's create `rkType` for `RkButton` which on *ios* will have blue background color and green on *android*.

```javascript
import {RkTheme} from 'react-native-ui-kitten';

//...

RkTheme.setType('RkButton','different',{
  backgroundColor: {
    ios: 'blue',
    android: 'green'
  }
});

//... or using internal control components:

RkTheme.setType('RkButton','different',{
  container: {
    backgroundColor: {
      ios: 'blue',
      android: 'green'
    }
  }
});

```
