import React from 'react';
import { Drawer, DrawerItem, IndexPath, Text } from '@ui-kitten/components';

export const DrawerSimpleUsageShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  return (
    <>
    <Text testID='drawer-value'>{`Selected: ${selectedIndex.row + 1}`}</Text>
    <Drawer
      testID='drawer'
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <DrawerItem testID='drawer-item-1' title='Users' />
      <DrawerItem testID='drawer-item-2' title='Orders' />
      <DrawerItem testID='drawer-item-3' title='Transactions' />
      <DrawerItem testID='drawer-item-4' title='Settings' />
    </Drawer>
    </>
  );
};
