# 3rd party icon libraries

Starting from UI Kitten 4.2, we introduce an Icon component that can work with 3rd party icon packages. In this guide, we'll show how to integrate <a href="https://github.com/oblador/react-native-vector-icons" target="_blank">vector icons</a> package with UI Kitten. Vector icons is a set of font-based icons library that renders a text as an icon symbol.
In case you prefer working with svg - check out <a href="https://akveo.github.io/react-native-ui-kitten/docs/guides/setup-icons-module">Eva Icons Integration Guide</a>.

<div class="note note-info">
  <div class="note-title">IMPORTANT</div>
  <div class="note-body">
  This tutorial assumes you have everything in place and [ApplicationProvider is configured](guides/install-ui-kitten).
  </div>
</div>

<hr>

## Installation

First, ensure that `react-native-vector-icons` library is installed: **<a href="https://github.com/oblador/react-native-vector-icons#installation" target="_blank">install react-native-vector-icons</a>**.


<hr>

### Configure Icon Adapter

After vector-icons is installed and you have everything in place, we need to create a mapping object, that can draw an icon by its name.
Let's create a separate file `feather-icons.js` and place there the following code.

```js
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // <-- Import Feather icons

export const FeatherIconsPack = {
  name: 'feather',
  icons: createIconsMap(),
};

function createIconsMap() {
  return {
    'facebook': IconProvider('facebook'),
    'google': IconProvider('google'),
    // ...
  };

  // or

  return new Proxy({}, {
    get(target, name) {
      return IconProvider(name);
    },
  });
}
```

And providing function

```js
function IconProvider(name) {
  return {
    toReactElement: (props) => FeatherIcon({ name, ...props }),
  };
}

function FeatherIcon({ name, style }) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <Icon
      name={name}
      size={height}
      color={tintColor}
      style={iconStyle}
    />
  );
}

```

<hr>

## Configure Icon Registry

After everything is configured, we simply need to import a feather icon map and register it with UI Kitten APIs.

```js
import * as React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, IconRegistry } from 'react-native-ui-kitten';
import { FeatherIconsPack } from './path-to/feather-icons.js'; // <-- Feather icons map

const App = () => (
  <ApplicationProvider
    mapping={mapping}
    theme={lightTheme}>
    <IconRegistry icons={[FeatherIconsPack]}/>
    <Layout style={{flex: 1}}/>
  </ApplicationProvider>
);

export default App;
```

<hr>

## Use it with UI Kitten components

```js
import * as React from 'react';
import { Button, Icon } from 'react-native-ui-kitten';

export const FacebookIcon = (style) => (
  <Icon name='facebook' {...style} />
);

export const LoginButton = () => (
  <Button icon={FacebookIcon}>Login with Facebook</Button>
);
```

That's it. UI Kitten with Vector Icons is ready now.

As a result, you should have a Button looking similar to this:

![image](assets/images/articles/guides/3rd-party-icons-sample.png)

<hr>

## More Icon Libraries

As you might notice, UI Kitten API allows you to register **multiple** icon packages with the following instruction.

```js
<IconRegistry icons={[FeatherIconsPack]}/>
```

Let's also create a Material Icons provider using the same method.

```js
// material-icons.js

import * as React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // <-- Import Material icons

export const MaterialIconsPack = {
  name: 'material',
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy({}, {
    get(target, name) {
      return IconProvider(name);
    },
  });
}

function IconProvider(name) {
  return {
    toReactElement: (props) => MaterialIcon({ name, ...props }),
  };
}

function MaterialIcon({ name, style }) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <Icon
      name={name}
      size={height}
      color={tintColor}
      style={iconStyle}
    />
  );
}
```

Now all we need to do is to extend our `IconRegistry`:

```js
import * as React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, IconRegistry } from 'react-native-ui-kitten';
import { FeatherIconsPack } from './path-to/feather-icons.js'; // <-- Feather icons map
import { MaterialIconsPack } from './path-to/material-icons.js'; // <-- Material icons map

const App = () => (
  <ApplicationProvider
    mapping={mapping}
    theme={lightTheme}>
    <IconRegistry icons={[FeatherIconsPack, MaterialIconsPack]}/>
    <Layout style={{flex: 1}}/>
  </ApplicationProvider>
);

export default App;
```

<hr>

## Choose a pack

Now you're able to choose an icon library with simply changing `pack` property.

```js
import * as React from 'react';
import { Button, Icon } from 'react-native-ui-kitten';

export const HomeIcon = (style) => (
  <Icon name='home' pack='material' {...style} />
);

export const HomeButton = () => (
  <Button icon={HomeIcon}>Home</Button>
);
```

That's it. Here is a result that you might have

**Material Icons**

![image](assets/images/articles/guides/3rd-party-icons-material.png)

**Feather Icons**

![image](assets/images/articles/guides/3rd-party-icons-feather.png)
