import React from 'react';
import { Drawer, DrawerItem, Text } from '@ui-kitten/components';

const MyDrawerItem = (props) => (
  <DrawerItem
    {...props}
    title={evaProps => <Text {...evaProps}>{props.title}</Text>}
  />
);

export const DrawerStylingShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <Drawer
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <MyDrawerItem title='Users'/>
      <MyDrawerItem title='Orders'/>
      <MyDrawerItem title='Transactions'/>
    </Drawer>
  );
};
