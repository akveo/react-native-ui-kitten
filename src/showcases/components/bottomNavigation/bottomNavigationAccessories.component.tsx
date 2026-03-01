import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, BottomNavigationProps, BottomNavigationTab, Icon, IconElement } from '@ui-kitten/components';

const PersonIcon = (props): IconElement => (
  <Icon
    {...props}
    name='person-outline'
  />
);

const BellIcon = (props): IconElement => (
  <Icon
    {...props}
    name='bell-outline'
  />
);

const EmailIcon = (props): IconElement => (
  <Icon
    {...props}
    name='email-outline'
  />
);

const useBottomNavigationState = (initialState = 0): BottomNavigationProps => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

export const BottomNavigationAccessoriesShowcase = (): React.ReactElement => {

  const topState = useBottomNavigationState();
  const bottomState = useBottomNavigationState();

  return (
    <>

      <BottomNavigation
        style={styles.bottomNavigation}
        {...topState}
      >
        <BottomNavigationTab
          title='USERS'
          icon={PersonIcon}
        />
        <BottomNavigationTab
          title='ORDERS'
          icon={BellIcon}
        />
        <BottomNavigationTab
          title='TRANSACTIONS'
          icon={EmailIcon}
        />
      </BottomNavigation>

      <BottomNavigation
        style={styles.bottomNavigation}
        {...bottomState}
      >
        <BottomNavigationTab icon={PersonIcon} />
        <BottomNavigationTab icon={BellIcon} />
        <BottomNavigationTab icon={EmailIcon} />
      </BottomNavigation>

    </>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
  },
});
