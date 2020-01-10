/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back'/>
);

const BackAction = () => (
  <TopNavigationAction icon={BackIcon}/>
);

export const TopNavigationInlineStylingShowcase = () => (
  <TopNavigation
    style={styles.topNavigation}
    title='Title'
    subtitle='Subtitle'
    leftControl={BackAction()}
    titleStyle={styles.title}
    subtitleStyle={styles.subtitle}
  />
);

const styles = StyleSheet.create({
  topNavigation: { backgroundColor: '#1A2138' },
  title: { color: '#EDF1F7' },
  subtitle: { color: '#C5CEE0' },
});
