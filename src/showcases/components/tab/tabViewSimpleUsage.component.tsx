import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Tab, TabView, Text } from '@ui-kitten/components';

export const TabViewSimpleUsageShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <>
    <Text testID='tab-view-value'>{`Selected: ${selectedIndex + 1}`}</Text>
    <TabView
      testID='tab-view'
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <Tab testID='tab-view-tab-1' title='USERS'>
        <Layout style={styles.tabContainer}>
          <Text category='h5'>
USERS
          </Text>
        </Layout>
      </Tab>
      <Tab testID='tab-view-tab-2' title='ORDERS'>
        <Layout style={styles.tabContainer}>
          <Text category='h5'>
ORDERS
          </Text>
        </Layout>
      </Tab>
      <Tab testID='tab-view-tab-3' title='TRANSACTIONS'>
        <Layout style={styles.tabContainer}>
          <Text category='h5'>
TRANSACTIONS
          </Text>
        </Layout>
      </Tab>
    </TabView>
    </>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
