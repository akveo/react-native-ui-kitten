import React from 'react';
import {
  Menu,
  MenuElement,
  MenuProps,
} from '@ui-kitten/components';

export const MenuShowcase = (props: MenuProps): MenuElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <Menu
      {...props}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
    />
  );
};
