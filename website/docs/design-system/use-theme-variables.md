---
id: use-theme-variables
title: Use Theme Variables
sidebar_label: Use Theme Variables
description: UI Kitten allows you using the theme you have provided in the application root. This allows you to easily create themed components.
keywords:
  - React Native
  - UI Kitten
  - theme variables
  - useTheme
  - useStyleSheet
  - withStyles
---

# Using Theme Variables

UI Kitten allows you using the theme you have provided in the application root. This allows you to easily create themed components.

---

## Declare Custom Component

Let's declare a `View` and set its `backgroundColor` to any color of current theme.

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

In the example above we use `withStyles` function imported from UI Kitten. This allows us create styles like you usually do with `StyleSheet` but with an ability to use current theme.

You can also use hooks `useTheme` and `useStyleSheet` in order to get styles & current theme variables. Here's an example:

```js
import React from 'react';
import { View } from 'react-native';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';

export const ThemedAwesomeView = () => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={[styles.view, { color: theme['color-primary-100'] }]} />
  );
};

const themedStyles = StyleService.create({
  view: {
    backgroundColor: 'color-primary-500',
  }
});
```

In the example above we use `useTheme` and `useStyleSheet` hooks imported from UI Kitten. `useStyleSheet` allows you to create styles with supported variables defined inside your theme config. `useTheme` allows you to get access to theme variables directly and use them inside React component.

That's it! Now you're done and able to use your themed component.

---

## Themed Component Usage

```js
import React from 'react';
import { ThemedAwesomeView } from './path-to/awesome.component'; // <-- import themed component

export const AwesomeViewShowcase = (props) => (
  <ThemedAwesomeView {...props} />
);
```

## Related Articles

- [Change Theme](/docs/guides/runtime-theming)
