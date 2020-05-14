import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Tab, TabView, Text } from '@ui-kitten/components';

export const TabViewLazyLoadingShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const shouldLoadComponent = (index) => index === selectedIndex;

  return (
    <TabView
      selectedIndex={selectedIndex}
      shouldLoadComponent={shouldLoadComponent}
      onSelect={index => setSelectedIndex(index)}>
      <Tab title='USERS'>
        <Layout style={styles.tabContainer}>
          <Text category='h5'>USERS</Text>
        </Layout>
      </Tab>
      <Tab title='ORDERS'>
        <Layout style={styles.tabContainer}>
          <Text category='h5'>ORDERS</Text>
        </Layout>
      </Tab>
      <Tab title='TRANSACTIONS'>
        <Layout style={styles.tabContainer}>
          <Text category='h5'>TRANSACTIONS</Text>
        </Layout>
      </Tab>
    </TabView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
