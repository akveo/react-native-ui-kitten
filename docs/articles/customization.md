### Overview
`react-native-ui-kitten` components have very flexible customization ability.

### rkType

Most of the components in this framework contain *rkType* property.
For those who familiar with web, you can think of it as a HTML *class* property.
Basically the main idea is to split style definitions from jsx templates.
Our components already have a set of predefined rkTypes. 
Or you can configure *rkType*s in somewhere in your application and after that you're able to reuse that style in your components by just passing it as an input property.
As well, there's always a possibility to override types for some specific component.

For example, consider this code: 

```jsx
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

```jsx
import {RkButton, RkTheme} from 'react-native-ui-kitten';

let accent = '#ed1c4d';

RkTheme.setType('RkButton', 'accent', {
  backgroundColor: accent,
  color: 'white'
});

//...

<RkButton rkType='accent'>
  Click me.
</RkButton>
```

### Platform-dependent styles

In some cases it may be necessary to write different styles depending on current platform. There is possibility to define 
platform dependent value. Let's create `rkType` for `RkButton` which on *iOS* will have blue background color and green on *android*.

```jsx
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

### Default values
Sometimes it very useful to set default style for all components in whole application without need to set explicitly `rkType`
for each component. All *rk-components* have type which always applied. Name of this type is set in `RkComponent.defaultType` variable.
All standard *rk-components* has defaultType `basic`. In order to change style for all components - just override this type.

Let's change color and size for all `RkText` components in app:

```jsx
  RkTheme.setType('RkText', 'basic', {
    fontSize: 12,
    color: 'midnightblue'
  });
```

### Themes

All base *rkTypes* depends on theme of application. *Theme* contains base values (colors, fontSizes etc) for all Rk-components.
You can easily override values in theme or even define your own theme using *[RkTheme](../theme)*.
But user-defined *rkType*s should also be able to respond theme changes.
For this purpose can be used property functions instead of values.
Let's create `rkType` for `RkText` which will depend on some value from theme.

```jsx
RkTheme.setType('RkText','primaryBackground',{
  backgroundColor: theme => theme.colors.primary
});
```

Variable `theme` here is instance of current theme. So in case theme was switched using `RkTheme.setTheme` function `rkType`
 create above will be also changed and all components with this type will be also updated.

Sometimes there is necessity to use theme values for regular components. In this case you need to use `RkStyleSheet`.
More detailed about it described here [LINK]