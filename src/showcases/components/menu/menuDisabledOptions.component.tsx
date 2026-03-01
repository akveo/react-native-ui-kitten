import React from 'react';
import { Icon, IconElement, Layout, Menu, MenuItem } from '@ui-kitten/components';

const StarIcon = (props): IconElement => (
  <Icon
    {...props}
    name='star'
  />
);

const ForwardIcon = (props): IconElement => (
  <Icon
    {...props}
    name='arrow-ios-forward'
  />
);

export const MenuDisabledOptionsShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <Layout level='1'>

      <Menu
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        <MenuItem
          title='Users'
          accessoryLeft={StarIcon}
          accessoryRight={ForwardIcon}
        />
        <MenuItem
          title='Orders'
          disabled={true}
          accessoryLeft={StarIcon}
          accessoryRight={ForwardIcon}
        />
        <MenuItem
          title='Transactions'
          accessoryLeft={StarIcon}
          accessoryRight={ForwardIcon}
        />
      </Menu>

    </Layout>
  );
};
