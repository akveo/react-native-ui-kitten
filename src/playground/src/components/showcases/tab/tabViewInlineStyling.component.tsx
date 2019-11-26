import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Tab,
  TabView,
  Text,
} from 'react-native-ui-kitten';

export const TabViewInlineStylingShowcase = (props) => (
  <TabView
    style={styles.tabView}
    tabBarStyle={styles.tabBar}
    indicatorStyle={styles.tabViewIndicator}>
    <Tab title='DASHBOARD'>
      <Text>DASHBOARD</Text>
    </Tab>
    <Tab title='SETTINGS'>
      <Text>SETTINGS</Text>
    </Tab>
  </TabView>
);

const styles = StyleSheet.create({
  tabView: { backgroundColor: '#EDF1F7' },
  tabBar: { backgroundColor: '#C5CEE0' },
  tabViewIndicator: { backgroundColor: '#3366FF' },
});
