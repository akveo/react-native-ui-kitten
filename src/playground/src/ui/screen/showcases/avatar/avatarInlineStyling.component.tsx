import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-ui-kitten';

export const AvatarInlineStylingShowcase = () => (
  <Avatar
    style={styles.avatar}
    source={require('../../../../assets/brand-logo.png')}
  />
);

const styles = StyleSheet.create({
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 16,
  },
});
