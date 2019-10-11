import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigationTab } from 'react-native-ui-kitten';

export const BottomNavigationTabInlineStylingShowcase = () => (
  <BottomNavigationTab
    style={styles.tab}
    titleStyle={styles.tabTitle}
    title='TAB 1'
  />
);

const styles = StyleSheet.create({
  tab: { backgroundColor: '#EDF1F7' },
  tabTitle: { color: '#3366FF' },
});
