import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigationTab } from '@ui-kitten/components';

export const BottomNavigationTabInlineStylingShowcase = () => (
  <BottomNavigationTab
    style={styles.tab}
    titleStyle={styles.tabTitle}
    title='USERS'
  />
);

const styles = StyleSheet.create({
  tab: { backgroundColor: '#EDF1F7' },
  tabTitle: { color: '#3366FF' },
});
