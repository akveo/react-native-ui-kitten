import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  createBottomTabNavigator,
  NavigationContainer,
  NavigationContainerProps,
  NavigationScreenProp,
  NavigationState,
  NavigationRoute,
} from 'react-navigation';
import {
  BottomTabNavigator as BottomTabNavigatorComponent,
  TabRoute,
} from '@kitten/ui';
import { TabScreen1 } from './tabScreen1.component';
import { TabScreen2 } from './tabScreen2.component';
import { TabScreen3 } from './tabScreen3.component';

interface NavigationProps {
  navigation: NavigationScreenProp<NavigationState>;
}

type CommonNavigationProps = NavigationProps & NavigationContainerProps;

export const TabNavigatorScreen: NavigationContainer = createBottomTabNavigator({
  Screen1: TabScreen1,
  Screen2: TabScreen2,
  Screen3: TabScreen3,
}, {
  initialRouteName: 'Screen1',
  tabBarComponent: (props: CommonNavigationProps) => getTabNavigationComponentWithRoutes(props),
});

function getTabNavigationComponentWithRoutes(props: CommonNavigationProps): React.ReactElement<ViewProps> {
  const routes: TabRoute[] = props.navigation.state.routes
    .map((route: NavigationRoute, i: number) => ({
      routeName: route.routeName,
      routeImage: getRouteImages()[i],
    }));
  const index: number = props.navigation.state.index;

  return (
    <BottomTabNavigatorComponent
      appearance='text-highlight'
      routes={routes}
      currentIndex={index}
      onTabChoose={(routeName: string) => navigateToTab(routeName, props.navigation.navigate)}
    />
  );
}

function navigateToTab(routeName: string, navigate: (routeName: string) => void): void {
  navigate(routeName);
}

function getRouteImages(): React.ReactElement<any>[] {
  return [
    <View style={styles.circle} />,
    <View style={styles.square} />,
    <View style={styles.rectangle} />,
  ];
}

const styles = StyleSheet.create({
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  square: {
    width: 20,
    height: 20,
  },
  rectangle: {
    width: 30,
    height: 20,
  },
});
