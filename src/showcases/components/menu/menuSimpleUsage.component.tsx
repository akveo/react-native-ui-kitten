import React from 'react';
import { IndexPath, Menu, MenuItem } from '@ui-kitten/components';

export const MenuSimpleUsageShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  return (
    <Menu
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <MenuItem title='Users'/>
      <MenuItem title='Orders'/>
      <MenuItem title='Transactions'/>
      <MenuItem title='Settings'/>
    </Menu>
  );
};
