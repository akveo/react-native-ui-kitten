import React from 'react';
import {
  ViewProps,
  ImageSourcePropType,
  View,
  Text,
  Image,
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
  BottomNavigatorTab,
} from '@kitten/ui';
import { StyleType } from '@kitten/theme';

const APPEARANCE: string = 'default';

const TabScreen1 = (): React.ReactElement<{}> => <View><Text>Tab Screen 1</Text></View>;
const TabScreen2 = (): React.ReactElement<{}> => <View><Text>Tab Screen 2</Text></View>;
const TabScreen3 = (): React.ReactElement<{}> => <View><Text>Tab Screen 3</Text></View>;

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
  tabBarComponent: (props: CommonNavigationProps) => renderBottomNavigation(props),
});

function getRouteName(routes: NavigationRoute[], index: number): string {
  return routes.find((route: NavigationRoute, i: number) => i === index).routeName;
}

function getIconSource(tabNumber: number, isSelected: boolean): ImageSourcePropType {
  const unexpectedIconUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/close-circle.png';
  const tab1Uri: string = 'https://akveo.github.io/eva-icons/fill/png/128/linkedin.png';
  const tab2Uri: string = 'https://akveo.github.io/eva-icons/fill/png/128/facebook.png';
  const tab3Uri: string = 'https://akveo.github.io/eva-icons/fill/png/128/twitter.png';
  const selectedTabUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/star.png';

  if (tabNumber === 1) {
    return isSelected ? { uri: selectedTabUri } : { uri: tab1Uri };
  } else if (tabNumber === 2) {
    return isSelected ? { uri: selectedTabUri } : { uri: tab2Uri };
  } else if (tabNumber === 3) {
    return isSelected ? { uri: selectedTabUri } : { uri: tab3Uri };
  }
  return { uri: unexpectedIconUri };
}

function navigateToTab(routeName: string, navigate: (routeName: string) => void): void {
  navigate(routeName);
}

function renderBottomNavigation(props: CommonNavigationProps): React.ReactElement<ViewProps> {
  const routes: NavigationRoute[] = props.navigation.state.routes;
  const index: number = props.navigation.state.index;

  return (
    <BottomTabNavigatorComponent
      appearance={APPEARANCE}
      selectedIndex={index}
      onSelect={(selectedIndex: number) =>
        navigateToTab(getRouteName(routes, selectedIndex), props.navigation.navigate)}>
      <BottomNavigatorTab
        title='Screen 1'
        icon={(style: StyleType) => (
          <Image
            source={getIconSource(1, index === 0)}
            style={style}
          />
        )}
      />
      <BottomNavigatorTab
        title='Screen 2'
        icon={(style: StyleType) => (
          <Image
            source={getIconSource(2, index === 1)}
            style={style}
          />
        )}
      />
      <BottomNavigatorTab
        title='Screen 3'
        icon={(style: StyleType) => (
          <Image
            source={getIconSource(3, index === 2)}
            style={style}
          />
        )}
      />
    </BottomTabNavigatorComponent>
  );
}
