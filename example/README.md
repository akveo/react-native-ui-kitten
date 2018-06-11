This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Available Scripts

We use [Yarn](https://yarnpkg.com/) as Dependency Manager, so you can use all the scripts below with yarn instead of npm.

* [npm start](#npm-start)
* [npm start-dev](#npm-start-dev)
* [npm ios](#npm-ios)
* [npm android](#npm-android)
* [npm watch-lib](#npm-watch-lib)

#### `npm start`

```
npm start
# or
yarn start
```

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

#### `npm start-dev`

```
npm start-dev
# or
yarn start-dev
```

Runs your application in development with launching gulp script which watches [react-native-ui-kitten](https://github.com/akveo/react-native-ui-kitten) source changes.


This script might be very helpful if you're debugging or you would like to [contribute](https://github.com/akveo/react-native-ui-kitten/blob/master/CONTRIBUTING.md) our UI-Kit.

#### `npm ios`

```
npm ios
# or
yarn ios
```

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm android`

```
npm android
# or
yarn android
```

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).

#### `npm watch-lib`

```
npm watch-lib
# or
yarn watch-lib
```

Starts gulp script witch watching for [react-native-ui-kitten](https://github.com/akveo/react-native-ui-kitten) library changes.

Use this script before `npm start` or use `npm start-dev` which runs `npm start` and `npm watch-lib` both.