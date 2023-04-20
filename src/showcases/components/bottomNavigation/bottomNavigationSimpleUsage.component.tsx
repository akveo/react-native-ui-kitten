import React from 'react';
import { BottomNavigation, BottomNavigationTab, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

export const BottomNavigationSimpleUsageShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text
          category='h4'
          style={styles.text}
        >
          Content
        </Text>
      </View>
      <BottomNavigation
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        <BottomNavigationTab title='USERS' />
        <BottomNavigationTab title='ORDERS' />
        <BottomNavigationTab title='TRANSACTIONS' />
      </BottomNavigation>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: '#EEF1F6',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
