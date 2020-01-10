import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from '@ui-kitten/components';

export const AvatarSimpleUsageShowcase = () => (
  <Avatar
    style={styles.avatar}
    source={require('../../assets/icon.png')}
  />
);

const styles = StyleSheet.create({
  avatar: {
    margin: 16,
  },
});
