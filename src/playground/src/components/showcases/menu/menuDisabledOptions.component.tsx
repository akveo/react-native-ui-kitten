import React from 'react';
import { Menu } from 'react-native-ui-kitten';

const data = [
  { title: 'Item 1' },
  { title: 'Item 2' },
  { title: 'Item 3', disabled: true },
  { title: 'Item 4' },
];

export const MenuDisabledOptionsShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <Menu
      data={data}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
    />
  );
};
