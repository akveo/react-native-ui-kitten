import React from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
} from '@ui-kitten/components';

export const BottomNavigationInlineStylingShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <BottomNavigation
      style={styles.bottomNavigation}
      indicatorStyle={styles.indicator}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}>
      <BottomNavigationTab title='USERS'/>
      <BottomNavigationTab title='ORDERS'/>
      <BottomNavigationTab title='TRANSACTION'/>
    </BottomNavigation>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: { backgroundColor: 'white' },
  indicator: { backgroundColor: 'black' },
});
