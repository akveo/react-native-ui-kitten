import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Text,
} from 'react-native-ui-kitten';
import { createBottomTabNavigator } from 'react-navigation';

const BottomNavigationShowcase = (props) => {

  const onTabSelect = (selectedIndex) => {
    const { [selectedIndex]: selectedRoute } = props.navigation.state.routes;
    props.navigation.navigate(selectedRoute.routeName);
  };

  return (
    <BottomNavigation
      selectedIndex={props.navigation.state.index}
      onSelect={onTabSelect}>
      <BottomNavigationTab title='Dashboard'/>
      <BottomNavigationTab title='Settings'/>
    </BottomNavigation>
  );
};

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text category='h1'>Dashboard</Text>
    </View>
  );
};

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text category='h1'>Dashboard</Text>
    </View>
  );
};

export const BottomNavigationWithReactNavigationShowcase = createBottomTabNavigator({
  Dashboard: Dashboard,
  Settings: Settings,
}, {
  initialRouteName: 'Dashboard',
  tabBarComponent: BottomNavigationShowcase,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

