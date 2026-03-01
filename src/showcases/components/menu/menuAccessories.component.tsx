import React from 'react';
import { Icon, IconElement, Layout, Menu, MenuItem, MenuProps } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

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

const useMenuState = (initialState = null): MenuProps => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

export const MenuAccessoriesShowcase = (): React.ReactElement => {

  const leftMenuState = useMenuState();
  const rightMenuState = useMenuState();

  return (
    <Layout
      style={styles.container}
      level='1'
    >

      <Menu
        style={styles.menu}
        {...leftMenuState}
      >
        <MenuItem
          title='Users'
          accessoryLeft={StarIcon}
        />
        <MenuItem
          title='Orders'
          accessoryLeft={StarIcon}
        />
        <MenuItem
          title='Transactions'
          accessoryLeft={StarIcon}
        />
      </Menu>

      <Menu
        style={styles.menu}
        {...rightMenuState}
      >
        <MenuItem
          title='Users'
          accessoryRight={ForwardIcon}
        />
        <MenuItem
          title='Orders'
          accessoryRight={ForwardIcon}
        />
        <MenuItem
          title='Transactions'
          accessoryRight={ForwardIcon}
        />
      </Menu>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menu: {
    flex: 1,
    margin: 8,
  },
});
