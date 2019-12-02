import React from 'react';
import {
  BottomNavigation,
  BottomNavigationElement,
  BottomNavigationProps,
} from '@ui-kitten/components';

export const BottomNavigationShowcase = (props: BottomNavigationProps): BottomNavigationElement => {

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  return (
    <BottomNavigation
      {...props}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
    />
  );
};
