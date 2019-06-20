# Using Theme Variables

UI Kitten allows you using the theme you have provided in the application root. This allows you to easily create themed components.

<hr>

## Declare Custom Component

Let's declare a `View` and set it `backgroundColor` to any color of current theme.

```js
import * as React from 'react';
import { View } from 'react-native';
import { withStyles } from 'react-native-ui-kitten';

const AwesomeView = (props) => {
  const { themedStyle, style, ...restProps } = this.props;
    
  return (
    <View {...restProps} style={[themedStyle, style]} />
  );
};

export const ThemedAwesomeView = withStyles(AwesomeView, (theme) => ({
  backgroundColor: theme['color-primary-500'],
}));
```

In the example above we use `withStyles` function imported from UI Kitten. This allows us create a styles like you usually do with `StyleSheet` but with an ability to use current theme.

That's it! Now you're done and able to use your themed component.

<hr>

## Themed Component Usage

```js
import * as React from 'react';
import { ThemedAwesomeView } from './path-to/awesome.component'; // <-- import themed component

export const AwesomeViewShowcase = (props) => (
  <ThemedAwesomeView {...props} />
);
```

## Related Articles

- [Change Theme](design-system/theme-change)
