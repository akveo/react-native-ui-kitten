import React from 'react';
import {
  Menu,
  MenuElement,
  MenuProps,
} from 'react-native-ui-kitten';

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
