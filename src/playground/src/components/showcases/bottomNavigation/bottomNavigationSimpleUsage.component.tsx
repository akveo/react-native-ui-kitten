import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
} from '@ui-kitten/components';

export const BottomNavigationSimpleUsageShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}>
      <BottomNavigationTab title='USERS'/>
      <BottomNavigationTab title='ORDERS'/>
      <BottomNavigationTab title='TRANSACTIONS'/>
    </BottomNavigation>
  );
};
