
# UI Kitten [<img src="https://i.imgur.com/oMcxwZ0.png" alt="Eva Design System" height="20px" />][link:eva] [![npm][badge:license]]() [![Build Status][badge:travis]][link:travis] [![Coverage Status][badge:coveralls]][link:coveralls]

[Documentation][link:doc-homepage]

UI Kitten is a React Native UI Library that allows you creating stunning multi-brand cross-platform mobile applications. 
The library is based on Eva Design System which brings consistency and scalability in the design and development process. 
It contains a set of general purpose UI components styled in a similar way. 
And the most awesome thing: the themes can be changed in the runtime, with no need to reload the application.

100% Free and Open Source!

[<img src="https://i.imgur.com/pYl0trU.jpg">][link:doc-homepage]

## What's included

- **20+ general-purpose components** designed and tested to save your time.

- **Comprehensive clear documentation** with the tons of examples.

- **Theming System.** Use Light and modern Dark themes and create your own.

- **Eva Design System Support.** Construct an interface using basic components following Eva specifications and it will always have a stunning design.

## Starter App

**Kitten Tricks** – [react-native starter kit][link:kitten-tricks] allows you to boost the development of a mobile app.
There is a huge variety of customizable layouts, use “as is” or add new blocks.

**Over 40 screens in dark and light themes** give you the possibility to create a bright and exclusive app while saving your time on compiling numerous details.  Also, you can download the source code and use it for your own benefit.  

## Quick Start

Install UI Kitten and Eva Design System packages via npm:

```bash
npm i react-native-ui-kitten @eva-design/eva
```

Modify your application root:

```jsx
import React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';

const App = () => (
  <ApplicationProvider 
    mapping={mapping}
    theme={lightTheme}
    <Layout style={{flex: 1}}/>
  </ApplicationProvider>
);

export default App;
```

The code above will configure your application component to apply Eva Design System styling magic.
Read the [Theme System guide][link:doc-theme-system] for more details.

## How can I support the developers?
- Star our GitHub repo :star:
- Create pull requests, submit bugs, suggest new features or documentation updates :wrench:
- Read us on [Medium][link:akveo-medium]
- Follow us on [Twitter][link:akveo-twitter]
- Like our page on [Facebook][link:akveo-facebook]

## License
[MIT](LICENSE.txt) license.

## More from Akveo
- [Eva Icons][link:eva-icons] - 480+ beautiful Open Source icons

## From Developers
Made with :heart: by [Akveo team][link:akveo-homepage]. Follow us on [Twitter][link:akveo-twitter] to get the latest news first!
We're always happy to receive your feedback!

[badge:license]: https://img.shields.io/npm/l/react-native-ui-kitten.svg
[badge:travis]: https://travis-ci.com/akveo/react-native-ui-kitten.svg?branch=master
[badge:coveralls]: https://coveralls.io/repos/github/akveo/react-native-ui-kitten/badge.svg?branch=master

[link:eva]: https://eva.design
[link:travis]: https://travis-ci.com/akveo/react-native-ui-kitten
[link:coveralls]: https://coveralls.io/github/akveo/react-native-ui-kitten?branch=master
[link:doc-homepage]: https://akveo.github.io/react-native-ui-kitten
[link:doc-theme-system]: https://akveo.github.io/react-native-ui-kitten/docs/guides/theme-system
[link:kitten-tricks]: https://github.com/akveo/kittenTricks
[link:eva-icons]: https://github.com/akveo/eva-icons
[link:akveo-homepage]: https://akveo.com
[link:akveo-medium]: https://medium.com/akveo-engineering
[link:akveo-twitter]: https://twitter.com/akveo_inc
[link:akveo-facebook]: https://www.facebook.com/akveo
