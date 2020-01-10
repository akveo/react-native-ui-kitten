import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Icon,
  TopNavigationAction,
} from '@ui-kitten/components';

const EditIcon = (style) => (
  <Icon {...style} name='edit'/>
);

export const TopNavigationActionInlineStylingShowcase = () => (
  <TopNavigationAction
    style={styles.action}
    icon={EditIcon}
  />
);

const styles = StyleSheet.create({
  action: { marginHorizontal: 4 },
});
