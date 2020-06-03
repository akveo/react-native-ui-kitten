# Configure Navigation

This guide will help you to configure the app to navigate between screens. UI Kitten has built-in components to fit <a href="https://reactnavigation.org" target="_blank">React Navigation</a> API. Let's use it to complete this guide with a simple 3 steps.

<hr>

## Installation

Let's start with installing React Navigation and it's required dependencies.

Please refer to the [official documentation](https://reactnavigation.org/docs/en/getting-started.html) to complete this step, since it may differ for Expo and Bare React Native projects. 

<hr>

## Create Screens

Let's start from the basics and create a simple example with 2 screens and configure navigation between them.

### Home Screen

Create a `home.component.js` file and paste the code below.

```jsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';

export const HomeScreen = ({ navigation }) => {

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={navigateDetails}>OPEN DETAILS</Button>
      </Layout>
    </SafeAreaView>
  );
};
```

The code above demonstrates the basic example of how to create screens in React Native. It already includes a header and a button to navigate to the second screen. Currently, this will not affect your app. We still need to create the Details screen and connect it with Home using React Navigation. But let's take additional attention for some details:

- `SafeAreaView` is the root element of the screen. This helps us to avoid drawing UI over the notches on physical devices.
- `TopNavigation` is the header of our application.
- `Layout` includes the main content of the screen.

Notice the `navigation` argument passed to `HomeScreen`. It comes from React Navigation when navigator is configured and can be used to perform navigation between screens. By pressing `Open Details` button it will perform navigation to the Details screen, so let's focus on its implementation.

### Details Screen

Create a `details.component.js` file and paste the code below.

```jsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const DetailsScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center' accessoryLeft={BackAction}/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>DETAILS</Text>
      </Layout>
    </SafeAreaView>
  );
};
```

The code above demonstrates the same structure as a Home screen, but with a few changes:

- `TopNavigationAction` is used to render a back arrow.
- `navigateBack` function is called when `TopNavigationAction` is pressed and navigates back to the Home screen.

That's it! All we need to do is to connect Home and Details screens using React Navigation.

<hr>

## Create Navigator

Create a `navigation.component.js` file and paste the code below.

```js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './home.component';
import { DetailsScreen } from './details.component';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='Home' component={HomeScreen}/>
    <Screen name='Details' component={DetailsScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
);

```

With the code above we used `createStackNavigator` function to create stack navigation between Home and Details screens.
We also used `NavigationContainer` component to create `AppNavigator` - the root component of your app. 

Now, the one thing we have to do is to render `AppNavigator`.

<hr>

## Configure Application Root

Go back to the `App.js` and paste the following code.

```jsx
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation.component';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppNavigator/>
    </ApplicationProvider>
  </>
);
```

That's it! By this guide, you learned how to create screens and perform simple navigation between them. Reload your app to review changes.

<hr>

## Other navigation components

UI Kitten includes much more components that can be used with React Navigation:

- [BottomNavigation](components/bottom-tabs) - renders the tabs at the bottom.
- [TabBar](components/top-tabs) - renders the tabs at the top.
- [Drawer](components/drawer) - renders swipeable side menu.

<hr>

## Note on the other navigation libraries

Since React Navigation is not the only solution to perform routing within the React Native app, you might be interested
in other navigation libraries like React Native Navigation by Wix. By default, UI Kitten is not well adopted to work with this library, and you may need to [improve it's performance](guides/improving-performance).

<hr>

## Conclusion

In this guide, we used React Navigation library to configure routing within React Native app. Consider reading the <a href="https://reactnavigation.org/docs/en/getting-started.html" target="_blank">documentation</a> to become more familiar with it as it is most popular solution in the React world.

By moving to the [next guide](guides/runtime-theming), you will learn how to change theme in runtime using UI Kitten.
