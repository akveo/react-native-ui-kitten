import React from 'react';
import { Layout, Menu, MenuItem, Text } from '@ui-kitten/components';

const MyMenuItem = (props) => (
  <MenuItem
    {...props}
    title={evaProps => <Text {...evaProps}>{props.title}</Text>}
  />
);

export const MenuStylingShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <Layout>

      <Menu
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}>
        <MyMenuItem title='Users'/>
        <MyMenuItem title='Orders'/>
        <MyMenuItem title='Transactions'/>
      </Menu>

    </Layout>
  );
};
