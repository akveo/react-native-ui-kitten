# Icon Packages

Starting from UI Kitten 4.2, we introduce an icons module built on top of <a href="https://akveo.github.io/eva-icons" target="_blank">Eva Icons</a>. Eva Icons is a pack of beautifully crafted Open Source icons for common actions and items. If you're not interested in using Eva Icons, learn how to integrate [3rd party Icon packages](guides/icon-packages#3rd-party-icon-packages).

<div class="note note-info">
  <div class="note-title">NOTE</div>
  <div class="note-body">
  You might not be interested in this guide, if you have initialized the app using UI Kitten template since it already includes Eva Icons. Anyway, if you want to know how to use 3rd party icon packages like `react-native-vector-icons`, use this guide to make it work in your app.
  </div>
</div>

<hr>

## Eva Icons

Let's start with installing Eva Icons and it's required dependencies.

```bash
npm i @ui-kitten/eva-icons react-native-svg
```

We also need to complete installation for iOS by linking react-native-svg.

```bash
cd ios && pod install
```

Now you should have all in place. We need to restart the bundler to apply the changes.
Go back to the root application directory, shut down the current bundler process and call `npm start -- --reset-cache`.

### Register Icons

Open `App.js` and paste the code below.

```jsx
import React from 'react';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as lightTheme } from '@eva-design/eva';

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text catetory='h1'>HOME</Text>
  </Layout>
);

const App = () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <HomeScreen />
    </ApplicationProvider>
  <React.Fragment />
);

export default App;
```

That's it. Let's see how it can be used in the project.

### Usage

```jsx
import React from 'react';
import { Button, Icon } from '@ui-kitten/components';

export const FacebookIcon = (style) => (
  <Icon name='facebook' {...style} />
);

export const LoginButton = () => (
  <Button icon={FacebookIcon}>Login with Facebook</Button>
);
```

As a result, you should have a Button looking similar to this:

![image](assets/images/articles/guides/sample-icon-button.png)

The complete list of available icons could be found on <a href="https://akveo.github.io/eva-icons" target="_blank">Eva Icons page</a>.

<hr>

## 3rd party Icon packages

If you're not interested in using Eva Icon, learn how to integrate UI Kitten with other icon packages with a simple 3 steps.

### Installation

For this example, let's install `react-native-vector-icons` library. Refer to the <a href="https://github.com/oblador/react-native-vector-icons#installation" target="_blank">official guide</a> to install it.

### Create Icon Adapter

After icon package is installed and you have everything in place, we need to create a mapping object, that can draw an icon by its name.
Let's create a `feather-icons.js` file and place there the following code.

```jsx
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const FeatherIconsPack = {
  name: 'feather',
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy({}, {
    get(target, name) {
      return IconProvider(name);
    },
  });
}

const IconProvider = (name) => ({
  toReactElement: (props) => FeatherIcon({ name, ...props }),
});

function FeatherIcon({ name, style }) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <Icon name={name} size={height} color={tintColor} style={iconStyle} />
  );
```

With the code above we create a Proxy object, that will direct requested icon to render `FeatherIcon` by requested name.

### Register Icons

Open `App.js` and paste the code below.

```jsx
import React from 'react';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { FeatherIconsPack } from './feather-icons';

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text catetory='h1'>HOME</Text>
  </Layout>
);

const App = () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <HomeScreen />
    </ApplicationProvider>
  <React.Fragment />
);

export default App;
```

That's it. Let's see how it can be used in the project.

### Usage

```jsx
import React from 'react';
import { Button, Icon } from '@ui-kitten/components';

export const FacebookIcon = (style) => (
  <Icon name='facebook' {...style} />
);

export const LoginButton = () => (
  <Button icon={FacebookIcon}>Login with Facebook</Button>
);
```

As a result, you should have a Button looking similar to this:

![image](assets/images/articles/guides/3rd-party-icons-sample.png)

<hr>

## Multiple Icon packages

UI Kitten API allows you to register multiple icon packages. Let's also create a Material Icons provider.

With a similar to [3rd party Icon packages guide](guides/icon-packages#3rd-party-icon-packages) way, create a Material Icons provider.

```jsx
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

const IconProvider = (name) => ({
  toReactElement: (props) => MaterialIcon({ name, ...props }),
});

function MaterialIcon({ name, style }) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <Icon name={name} size={height} color={tintColor} style={iconStyle} />
  );
}
```

### Register Icons

By passing an array of icon packs, we can register it in the application:

```jsx
import React from 'react';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { FeatherIconsPack } from './feather-icons.js'; // <-- Import Feather icons
import { MaterialIconsPack } from './material-icons.js'; // <-- Import Material icons

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text catetory='h1'>HOME</Text>
  </Layout>
);

const App = () => (
  <React.Fragment>
    <IconRegistry icons={[FeatherIconsPack, MaterialIconsPack]}/>
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <HomeScreen />
    </ApplicationProvider>
  </React.Fragment>
);

export default App;
```

### Usage

When using multiple icon packages, you're able to choose an icon library with simply changing `pack` property.

```jsx
import React from 'react';
import { Button, Icon } from '@ui-kitten/components';

export const HomeIcon = (style) => (
  <Icon {...style} name='home' pack='material' />
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

<hr>

## Conclusion

In this guide, you learned how to use UI Kitten Icon component. Since Eva Icons relies on svg icons, consider reading <a href="https://github.com/react-native-community/react-native-svg#react-native-svg" target="_blank">react-native-svg documentation</a> to become more familiar with it. Also, if you your icon pack of choice relies on vector icons, read <a href="https://github.com/oblador/react-native-vector-icons#table-of-contents" target="_blank">react-native-vector-icons docs</a>.

Next, when UI part is configured, let's move to the [next guide](guides/configure-navigation) to configure navigation.

