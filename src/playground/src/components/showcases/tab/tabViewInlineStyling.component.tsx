import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Tab,
  TabView,
  Text,
} from '@ui-kitten/components';

export const TabViewInlineStylingShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TabView
      style={styles.tabView}
      tabBarStyle={styles.tabBar}
      indicatorStyle={styles.tabViewIndicator}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}>
      <Tab title='USERS'>
        <Text>USERS</Text>
      </Tab>
      <Tab title='ORDERS'>
        <Text>ORDERS</Text>
      </Tab>
    </TabView>
  );
};

const styles = StyleSheet.create({
  tabView: { backgroundColor: '#EDF1F7' },
  tabBar: { backgroundColor: '#C5CEE0' },
  tabViewIndicator: { backgroundColor: '#3366FF' },
});
