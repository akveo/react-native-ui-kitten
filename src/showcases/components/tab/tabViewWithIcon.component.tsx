/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Icon,
  Layout,
  Tab,
  TabView,
  Text,
} from '@ui-kitten/components';

const PersonIcon = (style) => (
  <Icon {...style} name='person-outline'/>
);

const BellIcon = (style) => (
  <Icon {...style} name='bell-outline'/>
);

const EmailIcon = (style) => (
  <Icon {...style} name='email-outline'/>
);

export const TabViewWithIconShowcase = () => {

  const [topTabsIndex, setTopTabsIndex] = React.useState(0);
  const [bottomTabsIndex, setBottomTabsIndex] = React.useState(0);

  return (
    <Layout>

      <TabView
        selectedIndex={topTabsIndex}
        onSelect={setTopTabsIndex}>
        <Tab icon={PersonIcon}>
          <Layout style={styles.tabContainer}>
            <Text>List of users.</Text>
          </Layout>
        </Tab>
        <Tab icon={BellIcon}>
          <Layout style={styles.tabContainer}>
            <Text>List of orders.</Text>
          </Layout>
        </Tab>
        <Tab icon={EmailIcon}>
          <Layout style={styles.tabContainer}>
            <Text>List of transactions.</Text>
          </Layout>
        </Tab>
      </TabView>

      <TabView
        selectedIndex={bottomTabsIndex}
        onSelect={setBottomTabsIndex}>
        <Tab title='USERS' icon={PersonIcon}>
          <Layout style={styles.tabContainer}>
            <Text>List of users.</Text>
          </Layout>
        </Tab>
        <Tab title='ORDERS' icon={BellIcon}>
          <Layout style={styles.tabContainer}>
            <Text>List of orders.</Text>
          </Layout>
        </Tab>
        <Tab title='TRANSACTIONS' icon={EmailIcon}>
          <Layout style={styles.tabContainer}>
            <Text>List of transactions.</Text>
          </Layout>
        </Tab>
      </TabView>

    </Layout>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    minHeight: 64,
  },
});
