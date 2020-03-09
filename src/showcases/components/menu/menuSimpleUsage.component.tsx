import React from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Menu, MenuItem, Text } from '@ui-kitten/components';

export const MenuSimpleUsageShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [selectedTitle, setSelectedTitle] = React.useState('No markers');

  return (
    <Layout style={styles.container}>

      <Layout style={styles.menu}>

        <Text category='h6'>Default</Text>

        <Menu
          style={styles.menu}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          <MenuItem title='Users'/>
          <MenuItem title='Orders'/>
          <MenuItem title='Transactions'/>
        </Menu>

      </Layout>

      <Layout style={styles.menu}>

        <Text category='h6'>{selectedTitle}</Text>

        <Menu>
          <MenuItem title='Users' onPress={({ index }) => setSelectedTitle('Users')}/>
          <MenuItem title='Orders' onPress={({ index }) => setSelectedTitle('Orders')}/>
          <MenuItem title='Transactions' onPress={({ index }) => setSelectedTitle('Transactions')}/>
        </Menu>

      </Layout>

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

