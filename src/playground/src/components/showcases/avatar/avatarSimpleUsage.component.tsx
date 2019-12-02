import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-ui-kitten';

export const AvatarSimpleUsageShowcase = () => (
  <Avatar
    style={styles.avatar}
    source={require('../../../assets/images/brand-logo.png')}
  />
);

const styles = StyleSheet.create({
  avatar: {
    margin: 16,
  },
});
