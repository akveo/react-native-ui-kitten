import React from 'react';
import { Menu } from '@ui-kitten/components';

const data = [
  { title: 'Item 1' },
  {
    title: 'Item 2',
    subItems: [
      { title: 'Sub Item 1' },
      { title: 'Sub Item 2' },
    ],
  },
  { title: 'Item 3' },
  { title: 'Item 4' },
];

export const MenuWithSubMenuShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <Menu
      data={data}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
    />
  );
};
