import React from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Drawer, DrawerItem, Text } from '@ui-kitten/components';

export const DrawerSimpleUsageShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [selectedTitle, setSelectedTitle] = React.useState('No markers');

  return (
    <Layout style={styles.container}>

      <Layout style={styles.menu}>

        <Text category='h6'>Default</Text>

        <Drawer
          style={styles.menu}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          <DrawerItem title='Users'/>
          <DrawerItem title='Orders'/>
          <DrawerItem title='Transactions'/>
        </Drawer>

      </Layout>

      <Layout style={styles.menu}>

        <Text category='h6'>{selectedTitle}</Text>

        <Drawer>
          <DrawerItem title='Users' onPress={({ index }) => setSelectedTitle('Users')}/>
          <DrawerItem title='Orders' onPress={({ index }) => setSelectedTitle('Orders')}/>
          <DrawerItem title='Transactions' onPress={({ index }) => setSelectedTitle('Transactions')}/>
        </Drawer>

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

