import React from 'react';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const BottomNavigationSimpleUsageShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <Layout
      style={styles.container}
      level='2'
    >
      <Layout
        style={styles.contentContainer}
        level='2'
      >
        <Text
          testID='bottom-navigation-value'
          category='h4'
          appearance='hint'
          style={styles.text}
        >
          {`Content ${selectedIndex + 1}`}
        </Text>
      </Layout>
      <BottomNavigation
        testID='bottom-navigation'
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        <BottomNavigationTab testID='bottom-navigation-tab-1' title='USERS' />
        <BottomNavigationTab testID='bottom-navigation-tab-2' title='ORDERS' />
        <BottomNavigationTab testID='bottom-navigation-tab-3' title='TRANSACTIONS' />
      </BottomNavigation>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
