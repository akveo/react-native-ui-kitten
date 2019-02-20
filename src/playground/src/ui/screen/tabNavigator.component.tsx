import React from 'react';
import {
  ViewProps,
  ImageSourcePropType,
  View,
  Text,
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
  const unexpectedIconUri: string = 'https://cdn0.iconfinder.com/data/icons/customicondesignoffice5/256/stop.png';
  const tab1Uri: string = 'https://cdn0.iconfinder.com/data/icons/customicondesignoffice5/256/examples.png';
  const tab2Uri: string = 'https://cdn0.iconfinder.com/data/icons/customicondesignoffice5/256/attachment.png';
  const tab3Uri: string = 'https://cdn0.iconfinder.com/data/icons/customicondesignoffice5/256/announcements.png';
  const selectedTabUri: string = 'https://cdn0.iconfinder.com/data/icons/customicondesignoffice5/256/refresh.png';

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
      appearance='highlight'
      selectedIndex={index}
      onSelect={(selectedIndex: number) =>
        navigateToTab(getRouteName(routes, selectedIndex), props.navigation.navigate)}>
      <BottomNavigatorTab
        title='Screen 1'
        getIconSource={(isSelected: boolean) => getIconSource(1, isSelected)}
      />
      <BottomNavigatorTab
        title='Screen 2'
        getIconSource={(isSelected: boolean) => getIconSource(2, isSelected)}
      />
      <BottomNavigatorTab
        title='Screen 3'
        getIconSource={(isSelected: boolean) => getIconSource(3, isSelected)}
      />
    </BottomTabNavigatorComponent>
  );
}
