# Using Theme Variables

UI Kitten allows you using the theme you have provided in the application root. This allows you to easily create themed components.

<hr>

## Declare Custom Component

Let's declare a `View` and set it `backgroundColor` to any color of current theme.

```js
import React from 'react';
import { View } from 'react-native';
import { withStyles } from '@ui-kitten/components';

const AwesomeView = (props) => {
  const { eva, style, ...restProps } = props;

  return (
    <View {...restProps} style={[eva.style.awesome, style]} />
  );
};

export const ThemedAwesomeView = withStyles(AwesomeView, (theme) => ({
  awesome: {
    backgroundColor: theme['color-primary-500'],
  },
}));
```

In the example above we use `withStyles` function imported from UI Kitten. This allows us create a styles like you usually do with `StyleSheet` but with an ability to use current theme.

Complete list of variables could be found under [Light Theme Variables](design-system/eva-light-theme) table.


That's it! Now you're done and able to use your themed component.

<hr>

## Themed Component Usage

```js
import React from 'react';
import { ThemedAwesomeView } from './path-to/awesome.component'; // <-- import themed component

export const AwesomeViewShowcase = (props) => (
  <ThemedAwesomeView {...props} />
);
```

## Related Articles

- [Change Theme](guides/runtime-theming)
- [Light Theme](design-system/eva-light-theme)
- [Dark Theme](design-system/eva-dark-theme)
