import React from 'react';
import { BottomNavigation, BottomNavigationTab, Icon, IconElement } from '@ui-kitten/components';

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

export const BottomNavigationTabThemingShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <BottomNavigationTab
        icon={PersonIcon}
        title='USERS'
      />
      <BottomNavigationTab
        icon={BellIcon}
        title='ORDERS'
      />
      <BottomNavigationTab
        icon={EmailIcon}
        title='TRANSACTIONS'
      />
    </BottomNavigation>
  );
};
