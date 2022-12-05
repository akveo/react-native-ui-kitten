import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';

export const IconSimpleUsageShowcase = (): IconElement => (
  <Icon
    style={styles.icon}
    fill='#8F9BB3'
    name='star'
  />
);

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});
