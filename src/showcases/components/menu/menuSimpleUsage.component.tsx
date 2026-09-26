import React from 'react';
import { IndexPath, Menu, MenuItem, Text } from '@ui-kitten/components';

export const MenuSimpleUsageShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  return (
    <>
    <Text testID='menu-value'>{`Selected: ${selectedIndex.row + 1}`}</Text>
    <Menu
      testID='menu'
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <MenuItem testID='menu-item-1' title='Users' />
      <MenuItem testID='menu-item-2' title='Orders' />
      <MenuItem testID='menu-item-3' title='Transactions' />
      <MenuItem testID='menu-item-4' title='Settings' />
    </Menu>
    </>
  );
};
