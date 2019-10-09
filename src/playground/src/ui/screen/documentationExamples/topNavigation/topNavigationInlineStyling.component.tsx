import React from 'react';
import { StyleSheet } from 'react-native';
import { TopNavigation } from 'react-native-ui-kitten';

export const TopNavigationInlineStylingShowcase = (props) => (
  <TopNavigation
    style={styles.topNavigation}
    title='Title'
    subtitle='Subtitle'
    titleStyle={styles.title}
    subtitleStyle={styles.subtitle}
  />
);

const styles = StyleSheet.create({
  topNavigation: { backgroundColor: '#1A2138' },
  title: { color: '#EDF1F7' },
  subtitle: { color: '#C5CEE0' },
});
