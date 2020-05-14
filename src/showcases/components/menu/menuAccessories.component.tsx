import React from 'react';
import { Icon, Layout, Menu, MenuItem } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

const useMenuState = (initialState = null) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

export const MenuAccessoriesShowcase = () => {

  const leftMenuState = useMenuState();
  const rightMenuState = useMenuState();

  return (
    <Layout style={styles.container} level='1'>

      <Menu style={styles.menu} {...leftMenuState}>
        <MenuItem title='Users' accessoryLeft={StarIcon}/>
        <MenuItem title='Orders' accessoryLeft={StarIcon}/>
        <MenuItem title='Transactions' accessoryLeft={StarIcon}/>
      </Menu>

      <Menu style={styles.menu} {...rightMenuState}>
        <MenuItem title='Users' accessoryRight={ForwardIcon}/>
        <MenuItem title='Orders' accessoryRight={ForwardIcon}/>
        <MenuItem title='Transactions' accessoryRight={ForwardIcon}/>
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
