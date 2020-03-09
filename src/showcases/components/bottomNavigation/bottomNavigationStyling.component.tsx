import React from 'react';
import { BottomNavigation, BottomNavigationTab, Text } from '@ui-kitten/components';

const MyBottomNavigationTab = (props) => (
  <BottomNavigationTab
    {...props}
    title={evaProps => <Text {...evaProps}>{props.title}</Text>}
  />
);

export const BottomNavigationStylingShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <MyBottomNavigationTab title='USERS'/>
      <MyBottomNavigationTab title='ORDERS'/>
      <MyBottomNavigationTab title='TRANSACTION'/>
    </BottomNavigation>
  );
};
