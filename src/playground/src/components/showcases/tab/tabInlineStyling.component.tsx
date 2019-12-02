import React from 'react';
import { StyleSheet } from 'react-native';
import { Tab } from '@ui-kitten/components';

export const TabInlineStylingShowcase = () => (
  <Tab
    style={styles.tab}
    titleStyle={styles.tabTitle}
    title='USERS'
  />
);

const styles = StyleSheet.create({
  tab: { backgroundColor: '#EDF1F7' },
  tabTitle: { color: '#3366FF' },
});
