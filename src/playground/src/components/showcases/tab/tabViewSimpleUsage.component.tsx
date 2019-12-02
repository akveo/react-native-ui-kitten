import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Tab,
  TabView,
  Text,
} from '@ui-kitten/components';

export const TabViewSimpleUsageShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TabView
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}>
      <Tab title='USERS'>
        <Layout style={styles.tabContainer}>
          <Text>List of users.</Text>
        </Layout>
      </Tab>
      <Tab title='ORDERS'>
        <Layout style={styles.tabContainer}>
          <Text>List of orders.</Text>
        </Layout>
      </Tab>
      <Tab title='TRANSACTIONS'>
        <Layout style={styles.tabContainer}>
          <Text>List of transactions.</Text>
        </Layout>
      </Tab>
    </TabView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    minHeight: 64,
  },
});
