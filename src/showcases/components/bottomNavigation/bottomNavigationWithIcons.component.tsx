/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
} from '@ui-kitten/components';

const PersonIcon = (style) => (
  <Icon {...style} name='person-outline'/>
);

const BellIcon = (style) => (
  <Icon {...style} name='bell-outline'/>
);

const EmailIcon = (style) => (
  <Icon {...style} name='email-outline'/>
);

export const BottomNavigationWithIconsShowcase = () => {

  const [topSelectedIndex, setTopSelectedIndex] = React.useState(0);
  const [bottomSelectedIndex, setBottomSelectedIndex] = React.useState(0);

  return (
    <Layout>

      <BottomNavigation
        style={styles.bottomNavigation}
        selectedIndex={topSelectedIndex}
        onSelect={setTopSelectedIndex}>
        <BottomNavigationTab icon={PersonIcon}/>
        <BottomNavigationTab icon={BellIcon}/>
        <BottomNavigationTab icon={EmailIcon}/>
      </BottomNavigation>

      <BottomNavigation
        style={styles.bottomNavigation}
        selectedIndex={bottomSelectedIndex}
        onSelect={setBottomSelectedIndex}>
        <BottomNavigationTab title='USERS' icon={PersonIcon}/>
        <BottomNavigationTab title='ORDERS' icon={BellIcon}/>
        <BottomNavigationTab title='TRANSACTIONS' icon={EmailIcon}/>
      </BottomNavigation>

    </Layout>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
  },
});
