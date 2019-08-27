# Setup Icons Module

Starting from UI Kitten 4.2, we introduce an icons module built on top of <a href="https://akveo.github.io/eva-icons" target="_blank">Eva Icons</a>. Eva Icons is a pack of beautifully crafted Open Source icons for common actions and items.

<div class="note note-info">
  <div class="note-title">IMPORTANT</div>
  <div class="note-body">
  This tutorial assumes you have everything in place and [ApplicationProvider is configured](guides/install-ui-kitten).
  </div>
</div>

<hr>

## Installation

First, ensure that `react-native-svg` library is installed: **<a href="https://github.com/react-native-community/react-native-svg#installation" target="_blank">install react-native-svg</a>**.

Add `@ui-kitten/eva-icons` to project dependencies.

```bash
npm i @ui-kitten/eva-icons
```

<hr>

## Configure Icon Registry

```js
import * as React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, Layout, IconRegistry } from 'react-native-ui-kitten';

const App = () => (
  <ApplicationProvider
    mapping={mapping}
    theme={lightTheme}>
    <IconRegistry icons={EvaIconsPack}/>
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

That's it. UI Kitten with Eva Icons is ready now.

As a result, you should have a Button looking similar to this:

![image](assets/images/articles/guides/sample-icon-button.png)
